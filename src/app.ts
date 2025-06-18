import express from "express";
import cors from "cors";
import { logging } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import itemRoutes from "./routes/itemRoutes.js";
import { apiReference } from "@scalar/express-api-reference";
import config from "./config/config.js";
// this should be last import
import { apiReferenceOptions } from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(logging);
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use("/docs", apiReference(apiReferenceOptions));
app.use("/api/items", itemRoutes);

app.use(errorHandler);

export default app;
