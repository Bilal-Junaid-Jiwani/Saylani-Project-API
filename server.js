const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let products = [];
let idCounter = 1;

// Create Product
app.post("/api/products", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Name and price are required" });
    }
    const newProduct = { id: idCounter++, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Get All Products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Update Product
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id == id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
});

// Delete Product
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id != id);
    res.json({ message: "Product deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
