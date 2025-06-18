interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  LOG_LEVEL: string;
  corsOrigins: string[];
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL ?? "file:./dev.db",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
  corsOrigins: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : ["*"],
};

export default config;
