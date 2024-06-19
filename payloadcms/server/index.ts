import path from "path";
import http from "http";
import https from "https";
import express from "express";
import payload from "payload";
import dotenv from "dotenv";
import sendgridTransport from 'nodemailer-sendgrid';

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = express();
const port = process.env.PORT;
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));

const start = async (): Promise<void> => {
  const sendGridApiKey = process.env.SG_APIKEY;
  const transport = await sendgridTransport({
    apiKey: sendGridApiKey
  });

  await payload.init({
    secret: `${process.env.PAYLOAD_SECRET}`,
    express: app,
    ...(sendGridApiKey ? {
      email: {
        transportOptions: transport,
        fromName: "Admin",
        fromAddress: "support@ethnicast.com",
      }
    } : {}),
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.get("/", (req, res) => {
    res.redirect("/admin");
  });
  if (dev) {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () =>
      payload.logger.info(`Server started on port ${port}`)
    );
  } else {
    const options = {
      key: "/etc/ssl/private/myCA.key",
      cert: "/etc/ssl/certs/myCA.pem",
    };
    const httpServer = https.createServer(options, app);
    httpServer.listen(port, () =>
      payload.logger.info(`Server connected on port ${port}`)
    );
  }
};

start();
