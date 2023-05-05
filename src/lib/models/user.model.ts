import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  cart: {
    type: Object,
    default: { items: [] },
  },
});

// delete mongoose.models.User;
// mongoose.deleteModel("User");

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
