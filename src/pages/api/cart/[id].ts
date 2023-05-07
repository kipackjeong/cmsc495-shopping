import UserModel from "@/lib/models/user.model";
import { sessionOptions } from "@/lib/session";
import { ApiWrapper } from "@/lib/wrappers/api.wrapper";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export default ApiWrapper(async function carIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req;
  const user = await UserModel.findOne({ id: userId });
  const { cart } = user!;

  switch (req.method) {
    case "GET":
      GET();
      break;
    case "DELETE":
      DELETE();
      break;
  }
  async function GET() {
    if (req.query.id) {
    }
    if (req.query.quantity) {
    }
  }
  async function DELETE() {
    //TODO[epic=todos] implement Deleting item from the cart

    const productId = req.query.id;

    const idx = cart.items.findIndex(
      (item: any) => item.product.id === productId
    );

    console.log("user.cart.items[idx]: ", user.cart.items[idx]);

    user.cart.items = cart.items.filter(
      (item: any) => item.product.id !== productId
    );

    user.markModified("cart");

    await user.save();

    return res
      .status(200)
      .json({ message: "Deleted item from the user's cart", data: productId });
  }
});
