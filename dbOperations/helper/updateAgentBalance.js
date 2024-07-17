import UserModel from "../../shcemas/userSchema.js";

export const updateAgentBalance = async (existedPendintTx, txType) => {
  let updatedFieldForAgent;
  const currAgentData = await UserModel.findById(existedPendintTx.agentId);

  if (txType === "Cash Out") {
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
