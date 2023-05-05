import { sessionOptions } from "@/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("logoutRoute");

  req.session.destroy();

  return res.json({ message: "successfully logged out." });
},
sessionOptions);
