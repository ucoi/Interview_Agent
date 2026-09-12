import React from "react"
import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import {
  getInterviewById,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.actions"
import { redirect } from "next/navigation"

const Page = async ({ params }: RouteParams) => {
  const { id } = await params
  const user = await getCurrentUser()
  const interview = await getInterviewById(id)

  if (!interview) redirect("/")
  if (!user) redirect("/sign-in")

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  })

  if (!feedback) {
    return (
      <section className="section-feedback">
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-light-100">
            No feedback available yet for this interview.
          </p>
          <Button asChild className="btn-primary">
            <Link href="/">Back to dashboard</Link>
          </Button>
        </div>
      </section>
    )
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-success-100"
    if (score >= 50) return "text-primary-200"
    return "text-destructive-100"
  }

  return (
    <section className="section-feedback">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="capitalize">
          Feedback on the {interview.role} Interview
        </h2>
        <div className="flex flex-row items-center gap-6">
          <div className="flex flex-row items-center gap-2">
            <Image src="/star.svg" width={22} height={22} alt="score" className="h-[22px] w-[22px]" />
            <p>
              Overall Impression:{" "}
              <span className={`font-bold ${scoreColor(feedback.totalScore)}`}>
                {feedback.totalScore}
              </span>
              /100
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="date" className="h-[22px] w-[22px]" />
            <p>{dayjs(feedback.createdAt).format("MMM D, YYYY · h:mm A")}</p>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      <div className="card-border">
        <div className="card dark-gradient p-6">
          <h3 className="mb-2">Final Assessment</h3>
          <p className="text-light-100">{feedback.finalAssessment}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3>Breakdown of Evaluation</h3>
        {feedback.categoryScores.map((category, index) => (
          <div key={category.name} className="card-border">
            <div className="card dark-gradient p-5">
              <div className="mb-2 flex flex-row items-center justify-between">
                <p className="font-semibold text-light-100">
                  {index + 1}. {category.name}
                </p>
                <p className={`font-bold ${scoreColor(category.score)}`}>
                  {category.score}/100
                </p>
              </div>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-dark-200">
                <div
                  className="h-full rounded-full bg-primary-200"
                  style={{ width: `${category.score}%` }}
                />
              </div>
              <p className="text-light-400">{category.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="card-border flex-1">
          <div className="card dark-gradient p-6">
            <h3 className="mb-3 text-success-100">Strengths</h3>
            {feedback.strengths.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-light-100">
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-light-400">None noted for this interview.</p>
            )}
          </div>
        </div>

        <div className="card-border flex-1">
          <div className="card dark-gradient p-6">
            <h3 className="mb-3 text-destructive-100">
              Areas for Improvement
            </h3>
            {feedback.areasForImprovement.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {feedback.areasForImprovement.map((area, index) => (
                  <li key={index} className="text-light-100">
                    {area}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-light-400">None noted for this interview.</p>
            )}
          </div>
        </div>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            Back to Dashboard
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            Retake Interview
          </Link>
        </Button>
      </div>
    </section>
  )
}
export default Page