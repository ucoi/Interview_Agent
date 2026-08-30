import React from "react"
import dayjs from "dayjs"
import Image from "next/image"
import { getRandomInterviewCover } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TechIcons from "@/components/TechIcons"

const InterviewCard = ({interviewId , userId , role , type ,techstack, createdAt}: InterviewCardProps) => {
  const feedback = null as Feedback | null ;
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type ;
  const formattedDate = dayjs(feedback?.createdAt || createdAt ).format('YYYY-MM-DD');
  return (
    <div className="card-border min-h-96 w-[360px] gap-6 max-sm:w-full">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit rounded-bl-lg bg-light-600 px-4 py-2">
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
                alt="callender"
                width={22}
                height={22}
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="start" width={22} height={22}/>
              <p>{feedback?.totalScore ?? '---'}/100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You haven't taken any interviews yet. Take one now to start improving your skills   "}
          </p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <TechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link href={feedback? `/interview/${interviewId}/feedback`
              : `/interview/${interviewId}`
            }>
              {feedback? 'Check Feedback ' : 'View Interview '}
            </Link>

          </Button>
        </div>
      </div>
    </div>
  )
}
export default InterviewCard
