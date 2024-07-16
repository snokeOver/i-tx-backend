import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginMobile = async (req, res, next) => {
  const { Phone, Email, Pin } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({
      $or: [{ mobile: Phone }, { email: Email }],
    });

    if (!existingUser) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    const isMatched = bcrypt.compareSync(Pin, existingUser.pin);
    if (!isMatched) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }
    const payload = {
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
