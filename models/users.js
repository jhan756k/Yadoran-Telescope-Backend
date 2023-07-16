import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 8,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
