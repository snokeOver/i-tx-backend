import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const checkUserBalance = async (req, res) => {
  const { amount, mobile } = req.body;

  try {
    const existingUserDetails = await UserModel.findOne({ mobile });
    res.status(200).send(existingUserDetails.balance < amount ? true : false);
  } catch (err) {
    errorHandler(err, res);
  }
};
