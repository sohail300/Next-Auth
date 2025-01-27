import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
