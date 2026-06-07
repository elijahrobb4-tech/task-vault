// app/actions/tasks.ts
"use server"

import { auth } from "@/auth"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addTask(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  if (!title) return

  await supabase.from("tasks").insert({
    title,
    user_id: session.user.id,
  })

  revalidatePath("/dashboard")
}