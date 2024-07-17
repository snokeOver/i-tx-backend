import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const checkUserRole = async (req, res) => {
  const { userNumber } = req.body;

  try {
    const existingUserDetails = await UserModel.findOne({
      mobile: userNumber,
    });

    res
      .status(200)
      .send(
        existingUserDetails?.userRole === "User" &&
          existingUserDetails?.userStatus === "Active"
          ? false
          : true
      );
  } catch (err) {
    errorHandler(err, res);
  }
};
