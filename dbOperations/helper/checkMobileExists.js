import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const checkMobileExists = async (req, res) => {
  try {
    const result = await UserModel.exists({
      mobile: req.body.Phone,
    });
    res.status(200).send(result ? true : false);
  } catch (err) {
    errorHandler(err, res);
  }
};
