import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectMongo = async () => {
  console.log("connectMongo");
  mongoose.connect(process.env.MONGO_URI as string);
};

export const connectMongoWrapper =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("connectMongoWrapper");
    await connectMongo();
    return await fn(req, res);
  };

export default connectMongo;
