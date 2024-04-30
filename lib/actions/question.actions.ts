"use server";

import Question from "@/database/question.model";
import { connectedToDatabase } from "../mongoos";
import Tag from "@/database/tag.model";

export async function createQustion(param: any) {
  // eslint-disable-next-line no-empty
  try {
    connectedToDatabase();

    const { title, content, tags, author, path } = params;
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
      const existingTag = await Tag.findByIdAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocument.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });
  } catch (error) {}
}
