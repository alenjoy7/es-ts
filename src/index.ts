import app from "./app.js";
import config from "./config/config.js";
import log from "./utils/logger.js";

app.listen(config.port, () => {
  log.info(
    `Server is running on port ${config.port} in ${config.nodeEnv} mode`
  );
  log.info(`API docs available at http://localhost:${config.port}/docs`);
});
