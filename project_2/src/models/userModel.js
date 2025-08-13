import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    typeof: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    typeof: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    typeof: String,
    required: [true, "Please provide a password"],

  },
  isVerified: {
    typeof: Boolean,
    default: true,
  },
  isAdmin: {
    typeof: Boolean,
    default: true,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User