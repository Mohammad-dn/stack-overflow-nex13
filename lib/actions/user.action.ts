"use server";

import User from "@/database/user.model";
import { connectedToDatabase } from "../mongoos";

export async function getUserById(params: any) {
  try {
    connectedToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
