import UserModel from "@/lib/models/user.model";
import { connectMongoWrapper } from "@/lib/connect-mongo";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "@/lib/session";
import { User } from "@/lib/types";
import { ApiWrapper } from "@/lib/wrappers/api.wrapper";

export default ApiWrapper(async function cartIndexRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req;
  const user = await UserModel.findOne({ id: userId });
  const { cart } = user;

  // Get all the products in cart
  if (req.method == "GET") {
    return res
      .status(200)
      .json({ message: "Fetched user's cart", data: user.cart });
  }
  // Adding product into cart
  else if (req.method == "POST") {
    const { product, quantity } = req.body;
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

    return res.status(200).json({ message: "Product added to cart" });
  }
});
