import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;