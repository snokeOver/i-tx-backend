import UserModel from "../../shcemas/userSchema.js";

export const updateAgentBalance = async (existedPendintTx, status, txType) => {
  if (
    (txType === "Cash Out" || txType === "Cash In") &&
    status === "Rejected"
  ) {
    return;
  }

  let updatedFieldForAgent;
  const currAgentData = await UserModel.findById(existedPendintTx.agentId);

  if (txType === "Cash Out" && status === "Accepted") {
    updatedFieldForAgent = {
      balance:
        currAgentData.balance +
        existedPendintTx.amount +
        existedPendintTx.charge,
      updatedAt: Date.now(),
    };
  }

  if (txType === "Cash In") {
    updatedFieldForAgent = {
      balance: currAgentData.balance - existedPendintTx.amount,
      updatedAt: Date.now(),
    };
  }

  const updatedAgent = await UserModel.findByIdAndUpdate(
    existedPendintTx.agentId,
    { $set: updatedFieldForAgent },
    { new: true }
  );
};
