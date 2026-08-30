import React from 'react'
import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"
import { dummyInterviews } from "@/constrants"
import InterviewCard from "@/components/InterviewCard"

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex max-w-xl flex-col">
          <span className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase">
            ReadyRole · Powered by PrepPilot AI
          </span>

          <h2 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
            Walk into your next interview
            <span className="text-primary"> with confidence.</span>
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
          src="/robot.png"
          alt="Illustration of a friendly AI robot"
          width={400}
          height={400}
          className="w-full object-contain max-sm:hidden md:w-1/2"
        />
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <h2>Your interviews</h2>
        <div className="interviews-section">
          <div className="flex w-full flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-light-100">
              {dummyInterviews.map((interview) => (
                <InterviewCard {...interview} key = {interview.id} />
              ))}
            </p>
            <Button asChild className="btn-primary">
              <Link href="/interview">Start your first interview</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <h2>Available interviews</h2>
        <div className="interviews-section">
          <div className="flex w-full flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-light-100">
              {dummyInterviews.map((interview) => (
                <InterviewCard {...interview} key = {interview.id} />
              ))}
              {/*<p>You have not taken any interviews yet </p>*/}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
export default Page