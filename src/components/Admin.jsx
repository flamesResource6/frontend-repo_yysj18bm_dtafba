import { useEffect, useState } from 'react'

export default function Admin() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [applicants, setApplicants] = useState([])
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const a = await fetch(`${baseUrl}/api/admin/applicants`).then(r=>r.json())
        const i = await fetch(`${baseUrl}/api/admin/interviews`).then(r=>r.json())
        setApplicants(a.applicants || [])
        setInterviews(i.interviews || [])
      } catch (e) { /* ignore */ }
    }
    load()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Applicants</h3>
        <div className="space-y-3 max-h-[420px] overflow-auto">
          {applicants.map(a => (
            <div key={a.id} className="rounded-lg border border-gray-200 p-3">
              <p className="font-medium text-gray-900">{a.name} <span className="text-gray-500">({a.email})</span></p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{a.resume_text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Interviews</h3>
        <div className="space-y-3 max-h-[420px] overflow-auto">
          {interviews.map(i => (
            <div key={i.id} className="rounded-lg border border-gray-200 p-3">
              <p className="font-medium text-gray-900">Mode: {i.mode}</p>
              <p className="text-sm text-gray-600 mt-1">Messages: {i.messages?.length || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
