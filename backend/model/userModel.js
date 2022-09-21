import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  friend: { type: Array },
});

// userSchema.generateAuthToken() {

// }

export default new mongoose.model("User", userSchema);
