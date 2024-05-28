"use server";

import User from "@/database/user.model";
import { connectedToDatabase } from "../mongoos";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectedToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");

    // find interactions for the user and group by tags ...
    // interaction...
    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectedToDatabase();

    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
