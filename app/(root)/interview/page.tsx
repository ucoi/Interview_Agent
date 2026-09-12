import React from "react"
import Agent from "@/components/agent"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"


 const Page = async () => {
  const user = await getCurrentUser()
   if (!user) redirect("/sign-in")
  return (
    <>
      <h3>Interview Generation</h3>

      <Agent userName ={user.name}
             userId = {user.id}
             type = "interview"
      />
    </>
  )
}
export default Page
