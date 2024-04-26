"use server";

import { connectedToDatabase } from "../mongoos";

export async function createQustion(param: any) {
  // eslint-disable-next-line no-empty
  try {
    connectedToDatabase();
  } catch (error) {}
}
