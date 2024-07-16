import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const checkEamilExist = async (req, res) => {
  try {
    const result = await UserModel.exists({
      email: req.body.email,
    });
    res.status(200).send(result ? true : false);
  } catch (err) {
    errorHandler(err, res);
  }
};
