import { connectMongoWrapper } from "@/lib/connectMongo";
import UserModel from "@/lib/models/user.model";
import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default connectMongoWrapper(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSession(req, res, sessionOptions);
  const userSession = session.user!;
  const user = await UserModel.findOne({ id: userSession.id });

  if (req.method == "DELETE") {
    //TODO[epic=todos] implement Deleting item from the cart

    const { cart } = user!;
    console.log("req.query.id: ", req.query.id);

    const productId = req.query.id;

    const idx = cart.items.findIndex(
      (item: any) => item.product.id === productId
    );

    console.log("user.cart.items[idx]: ", user.cart.items[idx]);

    user.cart.items = cart.items.filter(
      (item: any) => item.product.id !== productId
    );

    user.markModified("cart");

    console.log("user.cart.items: ", user.cart.items);
    await user.save();
  }
});
