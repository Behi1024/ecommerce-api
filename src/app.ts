import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import categoriesRouter from "./routes/categories";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use("/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("ecommerce-api is running");
});

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
