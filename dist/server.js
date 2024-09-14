"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const options = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "../cert", "key.pem")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "../cert", "cert.pem")),
};
const server = https_1.default.createServer(options, (req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello, HTTPS World");
});
const PORT = 8443;
server.listen(PORT, () => {
    console.log(`HTTPS server is running at https://localhost:${PORT}`);
});
