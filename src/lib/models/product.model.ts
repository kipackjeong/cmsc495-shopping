import mongoose, { Schema, model, models } from "mongoose";
const ProductSchema = new Schema({
  id: String,
  title: String,
  description: String,
  price: String,
  rating: { rate: Number, count: Number },
  category: String,
  image: String,
});

// delete mongoose.models.User;
// mongoose.deleteModel("Product");

const ProductModel = models.Product || model("Product", ProductSchema);

export default ProductModel;
