import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const checkAgentRole = async (req, res) => {
  const { agentNumber } = req.body;

  try {
    const existingUserDetails = await UserModel.findOne({
      mobile: agentNumber,
    });

    res
      .status(200)
      .send(
        existingUserDetails?.userRole === "Agent" &&
          existingUserDetails?.userStatus === "Active"
          ? false
          : true
      );
  } catch (err) {
    errorHandler(err, res);
  }
};
