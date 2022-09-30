import mongoose, { Schema } from "mongoose";

const chennelSchema = new Schema(
  {
    user1: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    user2: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", chennelSchema);
