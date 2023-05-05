import UserModel from "@/lib/models/user.model";
import { connectMongoWrapper } from "@/lib/connectMongo";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "@/lib/session";
import { User } from "@/lib/types";

export default connectMongoWrapper(async function productsIndexRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSession(req, res, sessionOptions);
  const userSession = session.user!;
  const user = await UserModel.findOne({ id: userSession.id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.method == "POST") {
    const { product, quantity } = req.body;
    const { cart } = user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = cart.items.findIndex(
      (item: any) => item.product.id === product.id
    );

    if (productIndex >= 0) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: product, quantity });
    }

    user.markModified("cart");
    await user.save();

    return res
      .status(200)
      .json({ message: "Product added to cart", cart: user.cart });
  }
});
