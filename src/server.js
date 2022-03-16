import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { testDB } from "./db/index.js";

// *********************************** GLOBAL VARs ***********************************
const server = express();
const { port = 5001 } = process.env;

// *********************************** MIDDLEWARES ***********************************
server.use(cors());
server.use(express.json());
// *********************************** ENDPOINTS *************************************

// ********************************** ERROR HANDLERS *********************************

//********************************** SERVER RUNNING *********************************
console.table(listEndpoints(server));

server.listen(port, async () => {
  console.log("✅ Server listening at: " + port);
  await testDB();
});

server.on("error", (error) => {
  console.log("❌ Server not listening due to error: " + error);
});
