import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import InterviewCard from "@/components/InterviewCard"
import { getCurrentUser, getInterviewByUserId, getLatestInterviews } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"

const Page = async () => {

  const user = await getCurrentUser()
     if(!user) redirect('/sign-in')
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user.id),
    await getLatestInterviews({ userId: user.id }),
  ])

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0

  const firstName = user?.name?.split(" ")[0]
  const capitalizedFirstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : null

  return (
    <>
      <section className="card-cta">
        <div className="flex max-w-xl flex-col">
          <span className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase">
            ReadyRole · Powered by PrepPilot AI
          </span>

          <h2 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
            {capitalizedFirstName
              ? `Welcome back, ${capitalizedFirstName}.`
              : "Walk into your next interview"}
            <span className="text-primary">
              {" "}
              {capitalizedFirstName ? "Ready to practice?" : "with confidence."}
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Practice realistic interview questions, sharpen your answers, and
            get instant AI feedback that helps you improve with every practice
            session.
          </p>
          <Button asChild className="btn-primary mt-6 max-sm:w-full">
            <Link href="/interview">Start practicing</Link>
          </Button>
        </div>
        <Image
          src="/robot1.png"
          alt="Illustration of a friendly AI robot"
          width={400}
          height={400}
          className="w-full object-contain max-sm:hidden md:w-1/2"
        />
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <h2>Your interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3 py-10 text-center">
              <p className="text-light-100">
                You haven&apos;t taken any interviews yet.
              </p>
              <Button asChild className="btn-primary">
                <Link href="/interview">Start your first interview</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <h2>Available interviews</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3 py-10 text-center">
              <p className="text-light-100">
                No interview templates available yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
export default Page
