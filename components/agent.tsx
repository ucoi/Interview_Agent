import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({userName}:AgentProps) => {
  const isSpeaking = true ;
  const callStatus = CallStatus.INACTIVE
  const messages = [
    'whats ir name ?' ,
    'my name is Ahmed',
  ];
  const lastMessage = messages[messages.length - 1]
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer </h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
              width={540}
              height={540}
              className="size-[120px] rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p key={messages.length} className="animate-fadeIn">
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="flex w-full justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="btn-call relative">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.FINISHED
                ? "Call"
                : ". . . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">END</button>
        )}
      </div>
    </>
  )
}
export default Agent
