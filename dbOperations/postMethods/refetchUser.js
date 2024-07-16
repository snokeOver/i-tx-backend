import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";
import jwt from "jsonwebtoken";

export const refetchUser = async (req, res, next) => {
  const { mobile } = req.body;

  const jwtSecret = process.env.JWT_SECRET;

  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ mobile: mobile });

    if (!existingUser) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      mobile: existingUser.mobile,
      userRole: existingUser.userRole,
      balance: existingUser.balance,
      status: existingUser.userStatus,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
    res.status(200).send({ token, user: payload });
  } catch (err) {
    errorHandler(err, res);
  }
};
