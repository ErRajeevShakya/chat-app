import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    chatConnectionId: { type: Schema.Types.ObjectId, required: true },
    messages: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("messages", messageSchema);
