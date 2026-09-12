"use server"
import { db } from "@/firebase/admin"
import { generateText, Output } from "ai"
import { feedbackSchema } from "@/constrants"
import { google } from "@ai-sdk/google"

export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get()

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[]
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[]
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interviews = await db
    .collection('interviews')
    .doc(id)
    .get()

  if (!interviews.exists) return null


  return {
    id: interviews.id,
    ...interviews.data(),
  } as Interview
}

export async function createFeedback(params: CreateFeedbackParams){
  const {interviewId , userId , transcript} = params

  try {
    const formattedTranscript =  transcript
      .map((sentence : {role : string ; content: string})=>(
        `- ${sentence.role}:${sentence.content}\n`
      )).join('');

    const {output : {totalScore , categoryScores , strengths , areasForImprovement , finalAssessment }} = await generateText({
      model: google("gemini-3.6-flash"),
      output: Output.object({schema: feedbackSchema}),
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
    "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
  });

    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    })
    return {
    success: true, feedbackId: feedback.id,
    }
  }catch(err){
    console.log( "Error saving Feedback", err)
     return {success: false}
  }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
  const { interviewId, userId} = params

  const feedback = await db
    .collection('feedback')
    .where( 'interviewId', "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get()

  if(feedback.empty) return null;
  const feedbackDoc = feedback.docs[0];
  return {
    id : feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback ;
}




