"use server";

import Question from "@/database/question.model";
import { connectedToDatabase } from "../mongoos";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectedToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(param: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    connectedToDatabase();

    const { title, content, tags, author, path } = param;
    // create a question

    const question = await Question.create({
      title,
      content,
      author,
    });
    console.log("====================================");
    console.log("question", question);
    console.log("====================================");
    console.log("====================================");
    console.log("author", author);
    console.log("====================================");
    const tagDocument = [];
    // create the tag or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: {
            questions: question._id,
          },
        },
        { upsert: true, new: true }
      );
      tagDocument.push(existingTag._id);
    }

    await Question?.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });

    // create an interaction reacord for the user's ask question action
    // increment authur's reputation by +S for creating a question
    revalidatePath(path);
  } catch (error) {
    console.log("error", error);
  }
}
export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connectedToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
