import { IronSessionOptions, getIronSession } from "iron-session";
import { User, UserSession } from "./types";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import UserModel from "./models/user.model";
import { ApiError } from "next/dist/server/api-utils";
import { withIronSessionSsr } from "iron-session/next";
import { NextRequest, NextResponse } from "next/server";

export const sessionOptions: IronSessionOptions = {
  password:
    "12341590u20sdlkfjg1423opewrtjkew934815093651094u021985u23o4i5udsg0981u3204129408109480oueoit0912",
  cookieName: "user_session",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 60 * 60, // 1 hour
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: UserSession;
  }
}
export const handleSessionSsrWrapper =
  (fn: any) => async (context: GetServerSidePropsContext) => {
    console.log("handleSessionSsrWrapper");

    const session = await getIronSession(
      context.req,
      context.res,
      sessionOptions
    );
    if (!session.user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return fn(context);
  };
export const handleSessionForApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getIronSession(req, res, sessionOptions);
  const userSession = session.user!;

  const user = await UserModel.findOne({ id: userSession.id });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  req.userId = user.id;
};

declare module "next" {
  interface NextApiRequest {
    userId: string;
  }
}
