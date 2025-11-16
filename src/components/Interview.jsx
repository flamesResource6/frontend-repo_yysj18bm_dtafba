import { useEffect, useState } from 'react'

export default function Interview() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [roleId, setRoleId] = useState('')
  const [applicantId, setApplicantId] = useState('')
  const [interviewId, setInterviewId] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'lily', text: 'Welcome! Start the interview when ready.' }
  ])
  const [input, setInput] = useState('')
  const [coding, setCoding] = useState(false)
  const [code, setCode] = useState('')
  const [runOutput, setRunOutput] = useState('')

  useEffect(() => {
    // Read params from query (?roleId=&applicantId=)
    const params = new URLSearchParams(window.location.search)
    const r = params.get('roleId') || ''
    const a = params.get('applicantId') || ''
    setRoleId(r)
    setApplicantId(a)
  }, [])

  const startInterview = async () => {
    const res = await fetch(`${baseUrl}/api/interview/start?applicant_id=${applicantId}&role_id=${roleId}`, { method: 'POST' })
    const data = await res.json()
    setInterviewId(data.interview_id)
    setMessages([ { sender: 'lily', text: 'Hi! I’m Lily. Tell me about yourself.' } ])
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const user = input
    setMessages((m)=>[...m, { sender: 'candidate', text: user }])
    setInput('')
    const res = await fetch(`${baseUrl}/api/interview/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interview_id: interviewId, message: user })
    })
    const data = await res.json()
    setMessages((m)=>[...m, { sender: 'lily', text: data.reply }])
  }

  const startCoding = async () => {
    const res = await fetch(`${baseUrl}/api/interview/coding/start?interview_id=${interviewId}`, { method: 'POST' })
    const data = await res.json()
    setCoding(true)
    setCode(data.starter_code)
  }

  const runCode = async () => {
    const res = await fetch(`${baseUrl}/api/interview/coding/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interview_id: interviewId, language: 'javascript', code })
    })
    const data = await res.json()
    setRunOutput(data.stdout)
  }

  const complete = async () => {
    const res = await fetch(`${baseUrl}/api/interview/complete?interview_id=${interviewId}`, { method: 'POST' })
    const data = await res.json()
    window.location.href = `/results?communication=${data.communication}&problem=${data.problem_solving}&tech=${data.technical}&summary=${encodeURIComponent(data.summary)}`
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm min-h-[420px]">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 mb-4" />
          <div className="space-y-3 max-h-[320px] overflow-auto pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`${m.sender === 'lily' ? 'justify-start' : 'justify-end'} flex`}>
                <div className={`${m.sender === 'lily' ? 'bg-indigo-50 text-indigo-900' : 'bg-gray-900 text-white'} px-3 py-2 rounded-lg max-w-[75%]`}>{m.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="mt-4 flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Type your message..." />
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Send</button>
          </form>
        </div>
        {!interviewId ? (
          <button onClick={startInterview} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Start Interview</button>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={startCoding} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Switch to Coding</button>
            <button onClick={complete} className="px-4 py-2 rounded-lg bg-green-600 text-white">Complete Interview</button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900">Coding Test</h3>
          {coding ? (
            <>
              <textarea value={code} onChange={(e)=>setCode(e.target.value)} className="mt-2 w-full h-56 rounded-lg border-gray-300 font-mono text-sm" />
              <button onClick={runCode} className="mt-2 px-4 py-2 rounded-lg bg-gray-900 text-white">Run</button>
              {runOutput && <pre className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm whitespace-pre-wrap">{runOutput}</pre>}
            </>
          ) : (
            <p className="text-sm text-gray-600 mt-2">Switch to coding to see the task.</p>
          )}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900">Voice</h3>
          <p className="text-sm text-gray-600">Voice and avatar are mocked for now. Integrations are ready to be wired.</p>
        </div>
      </div>
    </section>
  )
}
