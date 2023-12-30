import path from "path";
import http from "http";
import https from "https";
import express from "express";
import payload from "payload";
import dotenv from "dotenv";

dotenv.config()

const dev = process.env.NODE_ENV !== "production";
const server = express();
const port = process.env.PORT;
server.use('/assets', express.static(path.resolve(__dirname, '../assets')))

const start = async (): Promise<void> => {
  await payload.init({
    secret: `${process.env.PAYLOAD_SECRET}`,
    express: server,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  if (process.env.NODE_ENV === "development") {
    const httpServer = http.createServer(server);
    httpServer.listen(port, () =>
      payload.logger.info(`Server started on port ${port}`)
    );
  } else {
    const options = {
      key: "/etc/ssl/private/myCA.key",
      cert: "/etc/ssl/certs/myCA.pem",
    };
    const httpServer = https.createServer(options, server);
    httpServer.listen(port, () =>
      payload.logger.info(`Server connected on port ${port}`)
    );
  }
};

start();
