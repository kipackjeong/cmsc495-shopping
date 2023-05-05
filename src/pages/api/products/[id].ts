import { connectMongoWrapper } from "@/lib/connectMongo";
import ProductModel from "@/lib/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";

export default connectMongoWrapper(async function productsIndexRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "DELETE") {
      let products = await ProductModel.deleteOne({ id: req.query.id });

      return res.json({
        message: "sucessfully deleted the product with id: " + req.query.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
