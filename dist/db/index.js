const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    imgLink: String,
});
// Defining Mongoose Models
const Admin = new mongoose.model("Admin", adminSchema);
const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);
module.exports = {
    Admin,
    User,
    Product,
};
