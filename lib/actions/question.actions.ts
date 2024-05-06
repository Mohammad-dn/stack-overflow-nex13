"use server";

import Question from "@/database/question.model";
import { connectedToDatabase } from "../mongoos";
import Tag from "@/database/tag.model";
import { GetQuestionsParams } from "./shared.types";
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

export async function createQustion(param: any) {
  // eslint-disable-next-line no-empty
  try {
    connectedToDatabase();

    const { title, content, tags, author, path } = param;
    // create a question

    const question = await Question.create({
      title,
      content,
      author,
      path,
    });

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
