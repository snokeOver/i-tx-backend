import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import errorHandler from "../helper/errorHandler.js";
import { updateAgentBalance } from "../helper/updateAgentBalance.js";
import { updateUserBalance } from "../helper/updateUserBalance.js";

export const updatePendingTx = async (req, res, next) => {
  const { _id, status, txType, rejectReason } = req.body;

  try {
    // Find the exact pending request
    const existedPendintTx = await CashOutInModel.findById(_id);
    if (!existedPendintTx) {
      return res.status(404).send({
        message: "Pending Tx Request not found!",
      });
    }

    let updatedAgent;

    // if the status is pending  then update data at the current transaction
    if (existedPendintTx.status === "Pending") {
      const updateFields = {
        ...(status && { status }),
        ...(rejectReason && { rejectReason }),
        updatedAt: Date.now(),
      };
      const updatedTx = await CashOutInModel.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );

      // console.log(updatedTx);
      // Now Get the current data and update the user balance for Cash In
      await updateUserBalance(existedPendintTx, status, txType);

      // Now Get the current data and update the Agent balance
      await updateAgentBalance(existedPendintTx, status, txType);
    }

    res.status(200).send({
      message: `Pending ${status} updated successfully!`,
      updatedAgent,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
