import UserModel from "@/lib/models/user.model";
import connectMongo from "@/lib/connectMongo";
import { withIronSessionApiRoute } from "iron-session/next";
import { checkPassword } from "@/lib/password";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  try {
    await connectMongo();
    console.log("successfully connected to mongo");
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!(await checkPassword(password, user.password))) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    await req.session.save();

    res.status(200).json({ message: "successfully logged in." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}, sessionOptions);
