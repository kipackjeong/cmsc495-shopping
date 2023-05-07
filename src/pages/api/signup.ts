import UserModel from "@/lib/models/user.model";
import connectMongo from "@/lib/connect-mongo";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/lib/password";

export default async function signupRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("signupRoute");

  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectMongo();
    console.log("successfully connected to mongo");

    const { firstName, lastName, email, password } = req.body;

    const alreadyExist = await UserModel.find({ email: email });

    if (alreadyExist.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    console.log("user is new user.");

    const hashedPassword = await hashPassword(password);

    console.log("hashedPassword: ", hashedPassword);

    await UserModel.create({
      id: nanoid(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "successfully created an user." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }

  return res;
}
