import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  crypto_token: { type: Number, required: true, default: 100 },
  id: { type: String },
});

export default mongoose.model("User", userSchema);