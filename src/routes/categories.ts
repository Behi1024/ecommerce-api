import express from "express";
import { Category } from "../models/Category";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/categorySchema";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

router.post("/", async (req, res) => {
  const validatedData = createCategorySchema.parse(req.body);

  const newCategory = await Category.create({
    name: validatedData.name,
  });

  res.status(201).json(newCategory);
});

router.patch("/:id", async (req, res) => {
  const validatedData = updateCategorySchema.parse(req.body);

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: validatedData.name,
    },
    {
      new: true,
    },
  );

  res.json(updatedCategory);
});
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    message: "Category deleted successfully",
  });
});

export default router;
