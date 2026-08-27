import React from 'react'
import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"

const Page = () => {
    return (
      <>
        <section className="card-cta">
          <div className="flex max-w-xl flex-col">
            <span className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase">
              ReadyRole : AI Interview Coach
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
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start Practicing </Link>
            </Button>
          </div>
          <Image
            src={"/robot.png"}
            alt={"robot guy"}
            width={400}
            height={400}
            className={"w-full object-contain max-sm:hidden md:w-1/2"}
          />
        </section>

        <section className="flex0col mt-8 flex gap-6">
          <h2>Your interviews </h2>
          <div className="interviews-section">
            <p>You have not take any interviews yet </p>
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2> Take an interview </h2>

          <div className="interviews-section">
            <p> There are no interviews yet </p>

          </div>
        </section>
      </>
    )
}
export default Page
