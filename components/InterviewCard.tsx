import React from "react"
import dayjs from "dayjs"
import Image from "next/image"
import { getRandomInterviewCover } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TechIcons from "@/components/TechIcons"
import { getFeedbackByInterviewId } from "@/lib/actions/general.actions"

const InterviewCard = async ({
  id,
  role,
  currentUserId,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    currentUserId && id
      ? await getFeedbackByInterviewId({
          interviewId: id,
          userId: currentUserId,
        })
      : null
  // ... rest unchanged ;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt).format(
    "YYYY-MM-DD"
  )

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-primary-200",
      Technical: "bg-success-100",
    }[normalizedType] || "bg-light-600"

  return (
    <div className="card-border min-h-96 w-[360px] gap-6 transition-transform duration-200 hover:scale-110 hover:border-primary-200/50 max-sm:w-full">
      <div className="card-interview">
        <div>
          <div
            className={`absolute top-0 right-0 w-fit rounded-bl-lg px-4 py-2 ${badgeColor}`}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="object-fit size-22.5 rounded-full"
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <div className="mt-3 flex flex-row gap-5">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/star.svg"
                alt="star"
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
              />
              <p>{feedback?.totalScore ?? "---"}/100</p>
            </div>
          </div>
          <p className="mt-5 line-clamp-2">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to start improving your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <TechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default InterviewCard
