import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId, // here could be error
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.pre is middleware and save parameter is event, this middleware will do some work before saving the password and next will send controll to other call and do not use arrow function inside this middleare b/c they dont have current context

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // will compare ecrypt password and entered password
};
userSchema.methods.generateAccessToken = function (password) {
  return jwt.sign(
    {
      _id: this._id, // we are getting _id from mongoDB
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function (password) {
  return jwt.sign(
    {
      _id: this._id, // we are getting _id from mongoDB
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // will compare ecrypt password and entered password
};

// in above userSchema.methods, we can add the functions using this methods property of userSchema

export const User = mongoose.model("User", userSchema);
/*
  note: 
  - adding index property while defining schema helps for searching that string
  - WHere ever we are writing true it can have error msg also like line no. 44

 */
