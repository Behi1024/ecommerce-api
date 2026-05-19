import express from "express";
import { User } from "../models/User";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

router.post("/", async (req, res) => {
  const validatedData = createUserSchema.parse(req.body);

  const newUser = await User.create(validatedData);

  res.status(201).json(newUser);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
});

router.patch("/:id", async (req, res) => {
  const validatedData = updateUserSchema.parse(req.body);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    validatedData,
    {
      new: true,
    },
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    message: "User deleted successfully",
  });
});

export default router;
