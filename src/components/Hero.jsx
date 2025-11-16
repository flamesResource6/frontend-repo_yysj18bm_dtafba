import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Lily — Your AI Recruiter
          </h1>
          <p className="mt-4 text-gray-600 text-lg leading-7">
            A realistic, human-like interviewer that screens candidates, adapts in real-time, and runs coding tests — all in one sleek experience.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link to="/roles" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors">View Roles</Link>
            <Link to="/apply" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-colors">Apply Now</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-xl">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
        </div>
      </div>
    </section>
  )
}
