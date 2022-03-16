import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

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

server.listen(port, () => {
  console.log("✅ Server listening at: " + port);
});

server.on("error", (error) => {
  console.log("❌ Server not listening due to error: " + error);
});
