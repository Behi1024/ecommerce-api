import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
  },
);

export const User = mongoose.model("User", userSchema);
