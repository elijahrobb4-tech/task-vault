// app/page.tsx
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
        🔒 Personal Task Vault
      </h1>
      <p className="text-slate-400 mb-8 max-w-md text-center">
        An ultra-secure, blazing fast dashboard to keep your daily operations organized. Powered by Next.js and Supabase.
      </p>
      <Link 
        href="/dashboard" 
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg shadow-lg transition duration-200"
      >
        Go to Dashboard →
      </Link>
    </div>
  )
}