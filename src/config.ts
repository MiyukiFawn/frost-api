import dotenv from "dotenv";

dotenv.config();

// SERVER CONFIG
const SERVER = {
  hostname: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT || 3000,
};

const config = {
  server: SERVER,
};

export default config;
