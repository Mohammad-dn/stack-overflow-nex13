import mongoos from "mongoose";

let isConnected: boolean = false;

export const connectedToDatabase = async () => {
  mongoos.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB URLL");
  if (isConnected) {
    console.log("mongo db is already connceted");
  }

  try {
    mongoos.connect(process.env.MONGODB_URL, {
      dbName: "devFlow",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("Mongo db connection faild", error);
  }
};
