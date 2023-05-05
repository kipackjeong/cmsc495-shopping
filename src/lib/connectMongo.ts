import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectMongo = async () =>
  mongoose.connect(process.env.MONGO_URI as string);

export const connectMongoWrapper =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();
    await fn(req, res);
  };

export default connectMongo;
