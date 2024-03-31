const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name."],
    },
    email: {
      type: String,
      required: [true, "Please add the user email."],
      unique: [true, "Email address already register"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password."],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
