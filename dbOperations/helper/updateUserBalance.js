import UserModel from "../../shcemas/userSchema.js";

export const updateUserBalance = async (existedPendintTx) => {
  const currUserData = await UserModel.findById(existedPendintTx.userId);
  const updatedFieldForUser = {
    balance: currUserData.balance + existedPendintTx.amount,
  };

  const updatedUserDetails = await UserModel.findByIdAndUpdate(
    existedPendintTx.userId,
    { $set: updatedFieldForUser },
    { new: true }
  );

  console.log(updatedUserDetails);
};
