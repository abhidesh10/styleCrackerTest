const express = require("express");
const bodyParser = require("body-parser");

require("./config/mongoConn");

const carts = require("./routes/carts");
const auth = require("./routes/auth");
const products = require("./routes/products");
const users = require("./routes/users");
const admin = require("./routes/admin");
const authMiddleware = require("./middleware/auth");

const mode = process.env.NODE_ENV;
const config = (mode == "prod") ? require("./env/production") : require("./env/development");
const PORT = config.port;

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json());

app.use("/", auth);
app.use("/users", authMiddleware.validate, users);
app.use("/products", authMiddleware.validate, products);
app.use("/carts", authMiddleware.validate, carts);
app.use("/admin", authMiddleware.validate, admin);

app.listen(PORT, () => {
	console.log("Express server started on PORT", PORT, "in", config.mode, "mode.");
})