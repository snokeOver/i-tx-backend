import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userRole: {
    type: String,
    required: true,
    default: "User",
  },
  userStatus: {
    type: String,
    default: "Pending", //cound be Pending/Active/Blocked
  },
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
  },

  pin: {
    type: String,
    required: true,
  },

  balance: {
    type: Number,
    required: true,
    default: 0,
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
const UserModel = mongoose.model("allUsers", userSchema);
export default UserModel;
