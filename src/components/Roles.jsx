import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Roles() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/roles`)
        const data = await res.json()
        setRoles(data.roles || [])
      } catch (e) {
        setRoles([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Open Roles</h2>
        <Link to="/apply" className="text-indigo-600 hover:text-indigo-700">Apply with resume →</Link>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading roles…</p>
      ) : roles.length === 0 ? (
        <p className="text-gray-500">No roles yet. Please try again later.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{role.description}</p>
              {role.requirements?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.requirements.slice(0,4).map((req, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{req}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{role.location || 'Remote'}</span>
                <Link to={`/roles/${role.id || ''}`} className="text-indigo-600 hover:text-indigo-700">View details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
