import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  const userRole = req?.query?.userRole || "";
  const search = req?.query?.search || "";
  const match = {
    name: { $regex: search, $options: "i" }, // Search by user name
  };

  try {
    let response;
    if (userRole && search) {
      // If both userRole and search are defined
      response = await UserModel.find({ userRole, ...match });
    } else if (userRole) {
      // If only userRole is defined
      response = await UserModel.find({ userRole });
    } else if (search) {
      // If only search is defined
      response = await UserModel.find(match);
    } else {
      // If neither userRole nor search is defined, get all users
      response = await UserModel.find();
    }

    res.status(200).send({
      message: "Users retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
