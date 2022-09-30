import mongoose, { Schema } from "mongoose";

const socketSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, required: true },
    socket: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SocketConversation", socketSchema);
