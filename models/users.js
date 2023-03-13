import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 8,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.comparePassword = async function (password) {
    return password === this.password;
};

export default mongoose.model("User", userSchema);