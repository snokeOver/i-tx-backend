import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { Category, Email, Phone, Name } = req.body;
  const salt = bcrypt.genSaltSync(11);
  const hashedPin = bcrypt.hashSync(req.body.Pin, salt);

  const userToSave = {
    userRole: Category,
    email: Email,
    mobile: Phone,
    pin: hashedPin,
    name: Name,
  };

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ mobile: userToSave.mobile }, { email: userToSave.email }],
    });

    let savedUser;
    // Save new user
    if (!existingUser) {
      const user = new UserModel(userToSave);
      savedUser = await user.save();
    }

    res.status(200).send({
      message: "User created successfully!",
      savedUser,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
