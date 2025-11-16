import { useState } from 'react'

export default function Application() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', email: '' })
  const [resumeText, setResumeText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [applicantId, setApplicantId] = useState('')
  const [loading, setLoading] = useState(false)

  const onUpload = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const fd = new FormData()
    fd.append('file', f)
    const res = await fetch(`${baseUrl}/api/upload-resume`, { method: 'POST', body: fd })
    const data = await res.json()
    setResumeText(data.resume_text || '')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, resume_text: resumeText })
      })
      const data = await res.json()
      setApplicantId(data.applicant_id)
      setSuggestions(data.suggested_roles || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Apply with your resume</h2>
      <form onSubmit={onSubmit} className="space-y-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={form.email} onChange={e=>setForm(v=>({...v,email:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="jane@domain.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Resume (PDF/DOC)</label>
          <input onChange={onUpload} type="file" accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm text-gray-600" />
        </div>
        {resumeText && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap">
            {resumeText}
          </div>
        )}
        <button disabled={loading} className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50">
          {loading ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Suggested roles</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((r, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm">{r}</span>
            ))}
          </div>
          {applicantId && <p className="text-sm text-gray-600 mt-3">Your application ID: {applicantId}</p>}
        </div>
      )}
    </section>
  )
}
