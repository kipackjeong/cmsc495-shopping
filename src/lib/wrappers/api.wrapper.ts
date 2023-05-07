import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../connect-mongo";
import { handleSessionForApi } from "../session";
import { ApiError } from "next/dist/server/api-utils";
export const ApiWrapper =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectMongo();
      await handleSessionForApi(req, res);
      console.log(req.userId);
      return await fn(req, res);
    } catch (error: ApiError | any) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal error" });
    }
  };
