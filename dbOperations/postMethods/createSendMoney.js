import errorHandler from "../helper/errorHandler.js";
import bcrypt from "bcrypt";

import UserModel from "../../shcemas/userSchema.js";
import SendMoneyModel from "../../shcemas/sendMoneySchema.js";

export const createSendMoney = async (req, res, next) => {
  const { Recipient, mobile, Amount, Pin, id, txType } = req.body;
  const sendMoneyCharge = 5; // >100 =5
  const sendAmount = parseFloat(Amount).toFixed(2);
  const chargeAmount =
    txType === "Send Money" && Amount > 100 ? sendMoneyCharge : 0;

  const dataToSave = {
    userId: id,
    txType,
    recipientId: "",
    userNumber: mobile,
    recipientNumber: Recipient,
    amount: sendAmount,
    charge: chargeAmount,
    status: "Completed",
  };

  try {
    // Check if User exists
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

    // Now check the recipient data
    const existingRecipient = await UserModel.findOne({ mobile: Recipient });
    if (!existingRecipient) {
      res.status(401).send({
        message: "Wrong Credentials!",
      });
    }

    // Update User balance: The amount and the charge will be deducted
    const updateFieldsForUser = {
      ...(Amount && {
        balance:
          existingUser.balance -
          parseFloat(sendAmount) -
          parseFloat(chargeAmount),
      }),
      updatedAt: Date.now(),
    };

    const updatedUserDetails = await UserModel.findByIdAndUpdate(
      existingUser._id,
      { $set: updateFieldsForUser },
      { new: true }
    );

    // Update Recipient balance: The amount and the charge will be added
    const updateFieldsForRecipient = {
      ...(Amount && {
        balance: parseFloat(existingRecipient.balance) + parseFloat(sendAmount),
      }),
      updatedAt: Date.now(),
    };

    const updatedRecipientDetails = await UserModel.findByIdAndUpdate(
      existingRecipient._id,
      { $set: updateFieldsForRecipient },
      { new: true }
    );
    // console.log(updatedRecipientDetails);

    // Save new send money Transaction
    let savedTransaction;
    dataToSave.recipientId = existingRecipient._id;

    if (existingUser && existingRecipient) {
      const transaction = new SendMoneyModel(dataToSave);
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
