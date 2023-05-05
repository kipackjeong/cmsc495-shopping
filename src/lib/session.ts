import type { IronSessionOptions } from "iron-session";
import { User, UserSession } from "./types";

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
