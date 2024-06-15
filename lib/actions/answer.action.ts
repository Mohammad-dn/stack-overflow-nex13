"use server";

import { Answer } from "@/database/answer.model";
import { connectedToDatabase } from "../mongoos";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectedToDatabase();

    const { author, content, question, path } = params;
    const newAnswer = await Answer.create({ content, author, question });

    // add the answer to the questions answer array

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO:Add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectedToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    throw error;
  }
}
