import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    // localhost:4005 (by default) -> localhost:5173
    // @@TODO: Process is really annoying right now!!
    // Install dependencies for local-client, run local-client, run npm start in root, and then
    // run node index.js serve in cli :(
    // local-client needs to work with lerna.
    app.use(
      createProxyMiddleware({
        target: "http://localhost:5173",
        //target: 'http://127.0.0.1:5173',
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  // custom promise to handle the server listening
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
