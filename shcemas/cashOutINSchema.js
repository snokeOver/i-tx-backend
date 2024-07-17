import mongoose, { Schema } from "mongoose";

const cashOutINSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "allUsers",
  },
  agentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "allUsers",
  },
  txType: {
    type: String,
    required: true, //Cash Out or Cash In
  },
  userNumber: {
    type: String,
    required: true,
  },
  agentNumber: {
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
    default: "Pending", //cound be Pending/Completed
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
const CashOutInModel = mongoose.model("allCashOutINs", cashOutINSchema);
export default CashOutInModel;
