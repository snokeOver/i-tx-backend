import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";
import { updateAgentBalance } from "../helper/updateAgentBalance.js";
import { updateUserBalance } from "../helper/updateUserBalance.js";

export const updatePendingTx = async (req, res, next) => {
  const { _id, status, txType } = req.body;

  try {
    // Find the exact pending request
    const existedPendintTx = await CashOutInModel.findById(_id);
    if (!existedPendintTx) {
      return res.status(404).send({
        message: "Pending Tx Rewuest not found!",
      });
    }

    let updatedAgent;

    // if the status is pending  then update data at the current transaction
    if (existedPendintTx.status === "Pending") {
      const updateFields = {
        ...(status && { status }),
        updatedAt: Date.now(),
      };
      const updatedTx = await CashOutInModel.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );

      // Now Get the current data and update the user balance for Cash In
      if (txType === "Cash In") {
        await updateUserBalance(existedPendintTx);
      }

      // Now Get the current data and update the Agent balance
      await updateAgentBalance(existedPendintTx, txType);
    }

    res.status(200).send({
      message: `Pending ${status} updated successfully!`,
      updatedAgent,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
