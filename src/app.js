const express = require("express");
const app = express();

app.use(express.json());

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
