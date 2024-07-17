import mongoose from "mongoose";

const historySchema = mongoose.Schema({
  email: { type: String, required: true },
  wager_token: { type: Number, required: true },
  won: { type: Boolean, required: true },
  streak_count: { type: Number, required: true, default: 1 },
  multiple_count: { type: Number, required: true, default: 1 },
  fresh: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("History", historySchema);