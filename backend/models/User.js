const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstname: { type: String,default: "",trim: true },
    lastname: { type: String,default: "",trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String, default: null },
    phone: { type: Number, default:0 },
    sex: { type: String, default: "" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
