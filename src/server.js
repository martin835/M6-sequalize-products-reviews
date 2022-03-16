import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { testDB, syncDB } from "./db/index.js";
import Product from "./db/models/product.js";
import Review from "./db/models/review.js";
import * as models from "./db/models/index.js";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
// *********************************** GLOBAL VARs ***********************************
const server = express();
const { port = 5001 } = process.env;

// *********************************** MIDDLEWARES ***********************************
server.use(cors());
server.use(express.json());
// *********************************** ENDPOINTS *************************************
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
// ********************************** ERROR HANDLERS *********************************

//********************************** SERVER RUNNING *********************************
console.table(listEndpoints(server));

server.listen(port, async () => {
  console.log("✅ Server listening at: " + port);
  await testDB();
  await syncDB();
});

server.on("error", (error) => {
  console.log("❌ Server not listening due to error: " + error);
});
