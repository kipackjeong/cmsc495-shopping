import ProductModel from "@/lib/models/product.model";
import { Product } from "@/lib/types";
import { connectMongoWrapper } from "@/lib/connectMongo";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default connectMongoWrapper(async function productsIndexRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("productsIndexRoute");

  let products = await ProductModel.find();

  if (products.length === 0) {
    await seedProducts();
    products = await ProductModel.find();
  }

  return res.json({ message: "hello world", data: products });
});

async function seedProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  for (var product of products) {
    const { title, description, price, rating, category, image } = product;
    await ProductModel.create({
      id: nanoid(),
      title,
      description,
      price,
      rating,
      category,
      image,
    });
  }
  console.log("seeding products completed");
}
