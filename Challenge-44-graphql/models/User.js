const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
});

module.exports = model("User", UserSchema);
