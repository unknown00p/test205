import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import ProductRoute from "./routes/ProductRoutes.js";
import connectDB from "./config/db.js";
import { notfound, errorHandler } from "./middleware/ErrorHander.js";

dotenv.config();
connectDB();

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello world from backend");
});

app.use("/api/products", ProductRoute);

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Backend is running on ${PORT}. Try http://localhost:${PORT}`);
});
