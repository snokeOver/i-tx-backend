import errorHandler from "../helper/errorHandler.js";
import bcrypt from "bcrypt";

import UserModel from "../../shcemas/userSchema.js";
import CashOutInModel from "../../shcemas/cashOutINSchema.js";

export const createCashOut = async (req, res, next) => {
  const { AgentNumber, mobile, Amount, Pin, id } = req.body;
  const cashOutCharge = 0.015; //1.5%
  const cashAmount = parseFloat(Amount).toFixed(2);
  const chargeAmount = parseFloat(Amount).toFixed(2) * cashOutCharge;

  const dataToSave = {
    userId: id,
    txType: "Cash Out",
    agentId: "",
    userNumber: mobile,
    agentNumber: AgentNumber,
    amount: cashAmount,
    charge: chargeAmount,
  };

  try {
    // Check if User data
    const existingUser = await UserModel.findOne({ mobile });

    if (!existingUser) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    const isMatched = bcrypt.compareSync(Pin, existingUser.pin);
    if (!isMatched) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    // Now check the Agent data
    const existingAgent = await UserModel.findOne({ mobile: AgentNumber });
    if (!existingAgent) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    dataToSave.agentId = existingAgent._id;

    // Update User balance: The amount and the charge will be deducted from the balance
    const updateFields = {
      ...(Amount && {
        balance: existingUser.balance - cashAmount - chargeAmount,
      }),

      updatedAt: Date.now(),
    };
    const updatedUser = await UserModel.findByIdAndUpdate(
      existingUser._id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    // Save new Transaction
    let savedTransaction;

    if (existingUser && existingAgent) {
      const transaction = new CashOutInModel(dataToSave);
      savedTransaction = await transaction.save();
    }

    res.status(200).send({
      message: "Transaction created successfully!",
      savedTransaction,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
