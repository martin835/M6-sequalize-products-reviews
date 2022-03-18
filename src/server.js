import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { testDB, syncDB } from "./db/index.js";
import Product from "./db/models/product.js";
import Review from "./db/models/review.js";
import Customer from "./db/models/customer.js";
import Category from "./db/models/category.js";
import * as models from "./db/models/index.js";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import customersRouter from "./services/customers/index.js";
import categoriesRouter from "./services/categories/index.js";
import cartRouter from "./services/cart/index.js";
// *********************************** GLOBAL VARs ***********************************
const server = express();
const { PORT = 5001 } = process.env;

// *********************************** MIDDLEWARES ***********************************
server.use(cors());
server.use(express.json());
// *********************************** ENDPOINTS *************************************
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/customers", customersRouter);
server.use("/categories", categoriesRouter);
server.use("/cart", cartRouter);
// ********************************** ERROR HANDLERS *********************************

//********************************** SERVER RUNNING *********************************
console.table(listEndpoints(server));

server.listen(PORT, async () => {
  console.log("🛫 Server listening at: " + PORT);
  await testDB();
  await syncDB();
});

server.on("error", (error) => {
  console.log("⛔️ Server not listening due to error: " + error);
});
