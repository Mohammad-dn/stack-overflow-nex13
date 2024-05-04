"use server";

import User from "@/database/user.model";
import { connectedToDatabase } from "../mongoos";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function createUser(userData: CreateUserParams) {
  try {
    connectedToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectedToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findByIdAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectedToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("user not found");
    }
    // delete user from data base
    // and question, answers, comments, etc
    // get user question id

    const questionUserIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // delete question user

    await Question.deleteMany({ author: user._id });

    // Todo: delete users answers,comments and more

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
