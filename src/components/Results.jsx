export default function Results() {
  const params = new URLSearchParams(window.location.search)
  const communication = Number(params.get('communication') || 0)
  const problem = Number(params.get('problem') || 0)
  const tech = Number(params.get('tech') || 0)
  const summary = decodeURIComponent(params.get('summary') || '')

  const ScoreCard = ({ label, value }) => (
    <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  )

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interview Results</h2>
      <div className="grid grid-cols-3 gap-4">
        <ScoreCard label="Communication" value={communication} />
        <ScoreCard label="Problem Solving" value={problem} />
        <ScoreCard label="Technical" value={tech} />
      </div>
      <div className="mt-6 rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900">Feedback</h3>
        <p className="text-gray-700 mt-2 leading-7">{summary}</p>
      </div>
      <div className="mt-8 flex gap-3">
        <a href="/roles" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Explore More Roles</a>
        <a href="/" className="px-4 py-2 rounded-lg bg-gray-900 text-white">Back to Home</a>
      </div>
    </section>
  )
}
