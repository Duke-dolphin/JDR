import { Document, Schema, model } from "mongoose";
import { hash } from "bcryptjs";

export interface User {
  _id?: string;
  isMj?: boolean;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await hash(this.password, 12);
});

const UserModel = model<User & Document>("User", userSchema);

export default UserModel;
