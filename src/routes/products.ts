import express from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { createProductSchema } from "../schemas/productSchema";
import { updateProductSchema } from "../schemas/productSchema";
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryId = req.query.categoryId;

  const filter = typeof categoryId === "string" ? { categoryId } : {};

  const products = await Product.find(filter);

  res.json(products);
});
router.post("/", async (req, res) => {
  const validatedData = createProductSchema.parse(req.body);

  const categoryExists = await Category.findById(validatedData.categoryId);

  if (!categoryExists) {
    return res.status(400).json({
      message: "Category does not exist",
    });
  }

  const newProduct = await Product.create(validatedData);

  res.status(201).json(newProduct);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

router.patch("/:id", async (req, res) => {
  const validatedData = updateProductSchema.parse(req.body);

  if (validatedData.categoryId) {
    const categoryExists = await Category.findById(validatedData.categoryId);

    if (!categoryExists) {
      return res.status(400).json({
        message: "Category does not exist",
      });
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    validatedData,
    {
      new: true,
    },
  );

  if (!updatedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(updatedProduct);
});

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product deleted successfully",
  });
});

export default router;
