import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const updateAUserStatus = async (req, res, next) => {
  const { userStatus, userRole } = req.body;

  const updateFields = {
    ...(userStatus && { userStatus }),
    updatedAt: Date.now(),
  };

  try {
    const existedUser = await UserModel.findById(req.params.id);
    if (!existedUser) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    if (
      !existedUser.bonusPaid &&
      userStatus === "Active" &&
      existedUser.userStatus === "Pending"
    ) {
      updateFields.balance = userRole === "Agent" ? 10000 : 40;
      updateFields.bonusPaid = true;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // This ensures that only the fields specified in the updateFields will be affected and others will remain unharm
      { new: true } //This ensured that it returns the updated document rather than the original one
    );

    res.status(200).send({
      message: "User Status updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
