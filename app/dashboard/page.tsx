// app/dashboard/page.tsx
import { auth, signOut } from "@/auth"
import { supabase } from "@/lib/supabase"
import { addTask } from "@/app/actions/tasks"

export default async function DashboardPage() {
  const session = await auth()
  
  // Fetch tasks specific to the logged-in user
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session?.user?.id || "")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
            <button className="px-3 py-1.5 bg-rose-500 text-white rounded-md text-sm hover:bg-rose-600 transition">
              Sign Out
            </button>
          </form>
        </div>

        {/* Task Form */}
        <form action={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks?.map((task) => (
            <li key={task.id} className="p-3 bg-slate-100 rounded-md flex items-center border border-slate-200">
              <span className="font-medium text-slate-700">{task.title}</span>
            </li>
          ))}
          {tasks?.length === 0 && (
            <p className="text-slate-400 text-center py-4">No tasks yet. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  )
}