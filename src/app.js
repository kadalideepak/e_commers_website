const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "..", "public")));

// ---------- FRONTEND PAGE ROUTES ----------

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// register
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});

// dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
});

// Products listing and add pages
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "ProductsListing.html"));
});

app.get("/products-add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "ProductsAdd.html"));
});

// Categories listing and add pages
app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "CategoriesListing.html"));
});

app.get("/categories-add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "CategoriesAdd.html"));
});

// sellerProfile listing and add pages
app.get("/sellerProfile", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "sellerProfileListing.html"),
  );
});

app.get("/sellerProfile-add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "sellerProfileAdd.html"));
});

//-------frontend page routes end-------

// auth routes
app.use("/api/auth", require("./routes/auth.routes"));

// user routes
app.use("/api/users", require("./routes/user.routes"));

// sekkerprofile
app.use("/api/seller-profiles", require("./routes/sellerProfile.routes"));

//catogory
app.use("/api/categories", require("./routes/category.routes"));

//products
app.use("/api/products", require("./routes/product.routes"));

//cart
app.use("/api/carts", require("./routes/cart.routes"));

//cart items
app.use("/api/cart-items", require("./routes/cartItem.routes"));

//order
app.use("/api/orders", require("./routes/order.routes"));

//order_list
app.use("/api/order-items", require("./routes/orderItem.routes"));

//payments
app.use("/api/payments", require("./routes/payment.routes"));

//review
app.use("/api/reviews", require("./routes/review.routes"));

app.get("/test", (req, res) => {
  res.json({ message: "API working" });
});

module.exports = app;
