import UserModel from "../../shcemas/userSchema.js";

export const updateUserBalance = async (existedPendintTx, status, txType) => {
  if (txType === "Cash Out" && status === "Accepted") return;
  if (txType === "Cash In" && status === "Rejected") return;

  const currUserData = await UserModel.findById(existedPendintTx.userId);

  let updatedFieldForUser;
  if (txType === "Cash Out" && status === "Rejected") {
    updatedFieldForUser = {
      balance:
        currUserData.balance +
        existedPendintTx.amount +
        existedPendintTx.charge,
    };
  }

  if (txType === "Cash In" && status === "Accepted") {
    updatedFieldForUser = {
      balance: currUserData.balance + existedPendintTx.amount,
    };
  }

  const updatedUserDetails = await UserModel.findByIdAndUpdate(
    existedPendintTx.userId,
    { $set: updatedFieldForUser },
    { new: true }
  );

  console.log(updatedUserDetails);
};
