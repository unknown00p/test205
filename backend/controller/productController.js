import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asynHandler.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const FetchProducts = asyncHandler(async (req, res) => {
	const productsFromDB = await Product.find({});
	res.json(productsFromDB);
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
