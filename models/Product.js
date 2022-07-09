import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        slug: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        brand: {type: String, required: true},
        category: {type: String, required: true},
        price: {type: Number, required: true},
        rating: {type: String, required: true, default: 0},
        numReview: {type: Number, required: true, default: 0},
        countInStocks: {type: Number, required: true},
        link: {type: String, required: true, default: ""},
        img: {type: String, required: true},
        description: {type: String, required: true},
    },
    {timestamps: true}
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product