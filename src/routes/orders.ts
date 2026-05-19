import express from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { createOrderSchema, updateOrderSchema } from "../schemas/orderSchema";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
});

router.post("/", async (req, res) => {
  const validatedData = createOrderSchema.parse(req.body);

  const userExists = await User.findById(validatedData.userId);

  if (!userExists) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  const product = await Product.findById(validatedData.productId);

  if (!product) {
    return res.status(400).json({
      message: "Product does not exist",
    });
  }

  const totalPrice = product.price * validatedData.quantity;

  const newOrder = await Order.create({
    userId: validatedData.userId,
    productId: validatedData.productId,
    quantity: validatedData.quantity,
    totalPrice,
  });

  res.status(201).json(newOrder);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.json(order);
});

router.patch("/:id", async (req, res) => {
  const validatedData = updateOrderSchema.parse(req.body);

  const existingOrder = await Order.findById(req.params.id);

  if (!existingOrder) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  const product = await Product.findById(existingOrder.productId);

  if (!product) {
    return res.status(400).json({
      message: "Product does not exist anymore",
    });
  }

  const totalPrice = product.price * validatedData.quantity;

  existingOrder.quantity = validatedData.quantity;
  existingOrder.totalPrice = totalPrice;

  await existingOrder.save();

  res.json(existingOrder);
});

router.delete("/:id", async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  if (!deletedOrder) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.json({
    message: "Order deleted successfully",
  });
});

export default router;
