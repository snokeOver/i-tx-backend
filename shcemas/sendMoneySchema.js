import mongoose, { Schema } from "mongoose";

const sendMoneySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "allUsers",
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "allUsers",
  },
  txType: {
    type: String,
    required: true,
    default: "Send Money",
  },
  userNumber: {
    type: String,
    required: true,
  },
  recipientNumber: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  charge: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// the collection name ends with (s)
const SendMoneyModel = mongoose.model("allSendMoneys", sendMoneySchema);
export default SendMoneyModel;
