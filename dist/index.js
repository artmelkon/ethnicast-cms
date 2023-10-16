"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const payload_1 = __importDefault(require("payload"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config({ path: './env/.env.dev' });
}
else {
    dotenv_1.default.config({ path: './env/.env.prod' });
}
const dev = process.env.NODE_ENV !== "production";
const server = (0, express_1.default)();
const port = process.env.PORT;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield payload_1.default.init({
        secret: `${process.env.PAYLOAD_SECRET}`,
        express: server,
        onInit: () => {
            payload_1.default.logger.info(`Payload Admin URL: ${payload_1.default.getAdminURL()}`);
        },
    });
    const nextApp = (0, next_1.default)({ dev });
    const nextHandler = nextApp.getRequestHandler();
    server.get("*", (req, res) => nextHandler(req, res));
    nextApp.prepare().then(() => {
        if (process.env.NODE_ENV === "development") {
            const httpServer = http_1.default.createServer(server);
            httpServer.listen(port, () => payload_1.default.logger.info(`Server started on port ${port}`));
        }
        else {
            const options = {
                key: "/etc/ssl/private/myCA.key",
                cert: "/etc/ssl/certs/myCA.pem",
            };
            console.log(`Next started`);
            const httpServer = https_1.default.createServer(options, server);
            httpServer.listen(port, () => console.log(`Server connected on port ${port}`));
        }
    });
});
start();
