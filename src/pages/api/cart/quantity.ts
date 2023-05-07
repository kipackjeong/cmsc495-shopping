import { connectMongoWrapper } from "@/lib/connect-mongo";
import UserModel from "@/lib/models/user.model";
import { ApiWrapper } from "@/lib/wrappers/api.wrapper";
import { NextApiRequest, NextApiResponse } from "next";

export default ApiWrapper(async function cartQuantityRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("/api/cart/quantity");

  const { userId } = req;
  const user = await UserModel.findOne({ id: userId });
  const { cart } = user!;

  switch (req.method) {
    case "GET":
      return GET();
      break;
    default:
      break;
  }

  async function GET() {
    return res
      .status(200)
      .json({ message: "Fetched cart's quantity", data: cart.items.length });
  }
});
