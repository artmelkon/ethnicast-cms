import path from "path";
import http from "http";
import https from "https";
import next from "next";
import express from "express";
import payload from "payload";
import dotenv from "dotenv";

dotenv.config()

const dev = process.env.NODE_ENV !== "production";
const server = express();
const port = process.env.PORT;

const start = async (): Promise<void> => {
  await payload.init({
    secret: `${process.env.PAYLOAD_SECRET}`,
    express: server,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  const nextApp = next({ dev });
  const nextHandler = nextApp.getRequestHandler();
  server.get("*", (req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
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
      console.log(`Next started`);
      const httpServer = https.createServer(options, server);
      httpServer.listen(port, () =>
        console.log(`Server connected on port ${port}`)
      );
    }
  });
};

start();
