import { Link, useLocation } from 'react-router-dom'
import { Menu, MessageSquare, BriefcaseBusiness, UploadCloud, Gauge } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500" />
          <span>Lily</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className={`flex items-center gap-2 hover:text-indigo-600 ${isActive('/roles') ? 'text-indigo-600' : 'text-gray-600'}`} to="/roles"><BriefcaseBusiness size={16}/> Roles</Link>
          <Link className={`flex items-center gap-2 hover:text-indigo-600 ${isActive('/apply') ? 'text-indigo-600' : 'text-gray-600'}`} to="/apply"><UploadCloud size={16}/> Apply</Link>
          <Link className={`flex items-center gap-2 hover:text-indigo-600 ${isActive('/admin') ? 'text-indigo-600' : 'text-gray-600'}`} to="/admin"><Gauge size={16}/> Admin</Link>
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-700"><Menu size={18}/></button>
      </div>
    </header>
  )
}
