import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asynHandler.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const FetchProducts = asyncHandler(async (req, res) => {
	try {
		// Check the cache first
		const cachedProducts = await redisClient.get("products");
		if (cachedProducts) {
			// If cached data is found, parse it and send as response
			res.json(JSON.parse(cachedProducts));
		} else {
			const productsFromDB = await Product.find({});
			// Cache the result in Redis for 1 hour (3600 seconds)
			await redisClient.setEx("products", 3600, JSON.stringify(productsFromDB));
			console.log("line 19");
			// Send the result as response
			res.json(productsFromDB);
		}
	} catch (err) {
		// Handle any errors
		res.status(500).json({ message: "Server error" });
	}
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const FetchProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});
export { FetchProducts, FetchProductById };
