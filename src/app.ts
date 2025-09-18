import express from "express";
import cors from "cors";
import { logging } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import itemRoutes from "./routes/itemRoutes.js";
import { apiReference } from "@scalar/express-api-reference";
import config from "./config/config.js";
import { generateApiReference } from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(logging);
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

// Register all routes first
app.use("/api/items", itemRoutes);
// Add any other routes here...

// Then initialize API reference after all routes are registered
app.use("/docs", apiReference(generateApiReference()));

app.use(errorHandler);

export default app;
