import React, { useState, useEffect, useRef } from 'react'

const StepBadge = ({ label, active, done }) => (
  <div className={`px-2 py-1 rounded text-xs font-medium border ${active ? 'border-teal-300 text-teal-300' : done ? 'border-white/20 text-white/60' : 'border-white/10 text-white/40'}`}>{label}</div>
)

const MAX_DURATION_SECONDS = 5 * 60 // 5 minutes
const DEFAULT_CHUNK_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_RETRIES = 3
const UPLOAD_TIMEOUT_MS = 90_000

const DemoUploader = () => {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [jobId, setJobId] = useState(null)
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const [durationInfo, setDurationInfo] = useState('')
  const [progress, setProgress] = useState(0)
  const [useChunked, setUseChunked] = useState(true)
  const BACKEND = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')
  const evtRef = useRef(null)

  const fetchJobs = async () => {
    if (!BACKEND) return
    try {
      const res = await fetch(`${BACKEND}/api/jobs?limit=10`)
      if (res.ok) {
        const data = await res.json()
        setJobs(Array.isArray(data) ? data : [])
      }
    } catch {}
  }

  // Validate duration client-side (max 5 minutes)
  const handleFileChange = (f) => {
    setError('')
    setDurationInfo('')
    setProgress(0)
    if (!f) { setFile(null); return }
    try {
      const url = URL.createObjectURL(f)
      const v = document.createElement('video')
      v.preload = 'metadata'
      v.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        const dur = v.duration || 0
        if (isFinite(dur) && dur > MAX_DURATION_SECONDS) {
          setError('Please select a clip up to 5 minutes long.')
          setFile(null)
          setDurationInfo('')
        } else {
          const minutes = Math.floor(dur / 60)
          const seconds = Math.round(dur % 60)
          setDurationInfo(dur ? `Duration: ${minutes}:${seconds.toString().padStart(2,'0')}` : '')
          setFile(f)
        }
      }
      v.onerror = () => {
        URL.revokeObjectURL(url)
        // If duration can't be read, allow upload but show a hint
        setDurationInfo('')
        setFile(f)
      }
      v.src = url
    } catch {
      setFile(f)
    }
  }

  const uploadWithProgress = async () => {
    // Choose chunked path for files > DEFAULT_CHUNK_SIZE
    if (!file) return
    if (!BACKEND) throw new Error('Backend URL is not set')

    if (!useChunked || file.size <= DEFAULT_CHUNK_SIZE) {
      // Simple form upload with progress simulation using fetch streaming not supported; provide quick fake progress
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS)
      try {
        setProgress(5)
        const form = new FormData()
        form.append('file', file)
        if (email) form.append('email', email)
        const res = await fetch(`${BACKEND}/api/upload`, { method: 'POST', body: form, signal: controller.signal })
        const data = await res.json().catch(()=>({}))
        if (!res.ok) throw new Error(data.detail || 'Upload failed')
        setProgress(100)
        return data
      } finally {
        clearTimeout(timeout)
      }
    }

    // Chunked flow
    const chunkSize = DEFAULT_CHUNK_SIZE
    const totalParts = Math.ceil(file.size / chunkSize)

    // 1) init
    const initForm = new FormData()
    initForm.append('filename', file.name)
    initForm.append('size_bytes', String(file.size))
    initForm.append('chunk_size', String(chunkSize))
    initForm.append('total_parts', String(totalParts))
    if (email) initForm.append('email', email)

    const initRes = await fetch(`${BACKEND}/api/upload/init`, { method: 'POST', body: initForm })
    const initData = await initRes.json().catch(()=>({}))
    if (!initRes.ok) throw new Error(initData.detail || 'Failed to initiate upload')
    const uploadId = initData.upload_id

    // 2) upload parts sequentially with retries
    let uploaded = 0
    for (let part = 1; part <= totalParts; part++) {
      const start = (part - 1) * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const blob = file.slice(start, end)

      let attempt = 0
      while (true) {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS)
        try {
          const form = new FormData()
          form.append('upload_id', uploadId)
          form.append('part_number', String(part))
          form.append('chunk', new File([blob], `${file.name}.part.${part}`))
          const res = await fetch(`${BACKEND}/api/upload/part`, { method: 'POST', body: form, signal: controller.signal })
          const data = await res.json().catch(()=>({}))
          if (!res.ok) throw new Error(data.detail || 'Chunk upload failed')
          uploaded += blob.size
          setProgress(Math.floor((uploaded / file.size) * 100))
          break
        } catch (err) {
          attempt++
          if (attempt >= MAX_RETRIES) throw err
          await new Promise(r => setTimeout(r, 1000 * attempt))
        } finally {
          clearTimeout(timeout)
        }
      }
    }

    // 3) complete
    const completeForm = new FormData()
    completeForm.append('upload_id', uploadId)
    const completeRes = await fetch(`${BACKEND}/api/upload/complete`, { method: 'POST', body: completeForm })
    const completeData = await completeRes.json().catch(()=>({}))
    if (!completeRes.ok) throw new Error(completeData.detail || 'Failed to finalize upload')
    setProgress(100)
    return completeData
  }

  const onUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    if (!BACKEND) {
      setError('Backend URL is not set. Please set VITE_BACKEND_URL in your environment.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await uploadWithProgress()
      if (!data.job_id) throw new Error('No job id returned from server')
      setJobId(data.job_id)
      setJob({ status: 'queued', progress: 0, current_step: 'analyze_content', steps: ["analyze_content","detect_cuts","auto_captions","select_music","insert_b_roll","color_and_export"] })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Prefer SSE for live updates; fall back to polling if not available
  useEffect(() => {
    if (!jobId || !BACKEND) return

    // Clean previous source
    if (evtRef.current) {
      evtRef.current.close()
      evtRef.current = null
    }

    let stopped = false

    try {
      const src = new EventSource(`${BACKEND}/api/jobs/${jobId}/events`)
      evtRef.current = src
      src.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data)
          setJob((prev) => ({ ...(prev || {}), ...data }))
          if (data.status === 'completed' || data.status === 'failed') {
            src.close()
          }
        } catch {}
      }
      src.onerror = () => {
        // Fallback to polling
        src.close()
        evtRef.current = null
        startPolling()
      }
    } catch {
      startPolling()
    }

    function startPolling(){
      const iv = setInterval(async () => {
        if (stopped) { clearInterval(iv); return }
        try {
          const res = await fetch(`${BACKEND}/api/jobs/${jobId}`)
          const data = await res.json()
          if (res.ok) setJob(data)
          if (data.status === 'completed' || data.status === 'failed') clearInterval(iv)
        } catch {}
      }, 900)
      return () => clearInterval(iv)
    }

    return () => {
      stopped = true
      if (evtRef.current) {
        evtRef.current.close()
        evtRef.current = null
      }
    }
  }, [jobId, BACKEND])

  useEffect(() => { fetchJobs() }, [BACKEND, jobId])

  const steps = job?.steps || ["analyze_content","detect_cuts","auto_captions","select_music","insert_b_roll","color_and_export"]

  return (
    <section className="relative py-24 bg-[#0A1E42]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {!BACKEND && (
          <div className="mb-6 p-4 rounded-xl border border-yellow-400/30 bg-yellow-500/10 text-yellow-200 text-sm">
            Missing backend URL. Set VITE_BACKEND_URL to your API base (e.g. https://your-backend-url) and reload.
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-white">Try a real upload</h3>
            <p className="mt-2 text-slate-300/90">Upload a short clip (up to 5 minutes, ~500MB) and watch the AI pipeline run in real time — analysis, captions, music selection, b‑roll, and export.</p>
            <form onSubmit={onUpload} className="mt-6 space-y-3">
              <input type="email" placeholder="Email (optional, for updates)" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none text-white placeholder:text-white/50" />
              <input type="file" accept="video/*" onChange={(e)=>handleFileChange(e.target.files?.[0] || null)} className="w-full text-sm text-white/80" />
              {durationInfo && <div className="text-xs text-white/60">{durationInfo}</div>}
              <div className="flex items-center gap-3">
                <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-purple-500 text-slate-900 font-semibold disabled:opacity-60" disabled={!file || loading}>
                  {loading ? 'Uploading…' : 'Upload & Process'}
                </button>
                {job?.status && <span className="text-sm text-white/70">{job.status} • {job.progress || 0}%</span>}
              </div>
              {!!progress && loading && (
                <div className="mt-2 h-2 w-full rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-purple-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <input id="chunked" type="checkbox" checked={useChunked} onChange={(e)=>setUseChunked(e.target.checked)} />
                <label htmlFor="chunked">Use chunked upload with resume</label>
              </div>
            </form>
            {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
            {jobId && (
              <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm text-white/80">Job: {jobId}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {steps.map((s)=>{
                    const active = job?.current_step === s && job?.status !== 'completed'
                    const done = job && steps.indexOf(s) <= steps.indexOf(job.current_step || steps[0]) && job.status !== 'failed'
                    return <StepBadge key={s} label={s.replaceAll('_',' ')} active={active} done={done} />
                  })}
                </div>
                <div className="mt-3 h-2 w-full rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-purple-500" style={{ width: `${job?.progress || 0}%` }} />
                </div>
              </div>
            )}
            <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-video">
                {job?.status === 'completed' ? (
                  <video controls className="w-full h-full object-cover" src={`${BACKEND}${job?.render_url}`}></video>
                ) : (
                  <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" />
                )}
              </div>
              {job?.status === 'completed' && (
                <div className="p-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded bg-black/40 text-white/80 text-sm">Ready</div>
                  <a href={`${BACKEND}${job?.render_url}?download=1`} download className="px-4 py-2 rounded bg-white text-slate-900 font-medium">Download</a>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold">Recent renders</h4>
                <button onClick={fetchJobs} className="text-xs text-white/70 hover:text-white">Refresh</button>
              </div>
              <div className="mt-3 space-y-2 max-h-[360px] overflow-auto pr-1">
                {jobs.length === 0 && <div className="text-white/60 text-sm">No jobs yet.</div>}
                {jobs.map((j) => (
                  <button key={j.job_id || j.filename} onClick={() => { setJobId(j.job_id); setJob(j); }} className={`w-full text-left p-3 rounded-lg border border-white/10 hover:border-white/20 bg-black/20`}>
                    <div className="text-xs text-white/60 truncate">{j.filename}</div>
                    <div className="text-sm text-white/90">{j.status} • {j.progress || 0}%</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoUploader
