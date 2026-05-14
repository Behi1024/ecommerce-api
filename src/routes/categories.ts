import express from "express";
import { Category } from "../models/Category";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create({
    name: "Retro Consoles",
  });

  res.status(201).json(newCategory);
});

export default router;
