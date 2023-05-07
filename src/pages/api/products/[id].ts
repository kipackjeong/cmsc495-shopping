import { connectMongoWrapper } from "@/lib/connect-mongo";
import ProductModel from "@/lib/models/product.model";
import { ApiWrapper } from "@/lib/wrappers/api.wrapper";
import { NextApiRequest, NextApiResponse } from "next";

export default ApiWrapper(async function productsIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "DELETE") {
    let products = await ProductModel.deleteOne({ id: req.query.id });

    return res.json({
      message: "sucessfully deleted the product with id: " + req.query.id,
    });
  }
});
