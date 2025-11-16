import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Roles from './components/Roles'
import Application from './components/Application'
import Interview from './components/Interview'
import Results from './components/Results'
import Admin from './components/Admin'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>{children}</main>
      <footer className="mt-20 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Lily — Your AI Recruiter</p>
          <a href="/test" className="text-gray-500 hover:text-gray-700">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Hero/></Layout>} />
      <Route path="/roles" element={<Layout><Roles/></Layout>} />
      <Route path="/apply" element={<Layout><Application/></Layout>} />
      <Route path="/interview" element={<Layout><Interview/></Layout>} />
      <Route path="/results" element={<Layout><Results/></Layout>} />
      <Route path="/admin" element={<Layout><Admin/></Layout>} />
    </Routes>
  )
}
