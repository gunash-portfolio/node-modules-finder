import https from "https";
import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";

const options = {
  key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem")),
};

const server = https.createServer(
  options,
  (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello, HTTPS World");
  },
);

const PORT = 8443;
server.listen(PORT, () => {
  console.log(`HTTPS server is running at https://localhost:${PORT}`);
});
