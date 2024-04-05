// index.ts
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

  app.use(createCellsRouter(filename, dir));

  // if we are in development mode, we want to use the proxy
  if (useProxy) {
    console.log("Using proxy to redirect requests to local-client...");
    // localhost:4005 (by default) -> localhost:5173
    app.use(
      createProxyMiddleware({
        //@@TODO: extract this to a config file
        //target: 'http://127.0.0.1:5173',
        target: "http://localhost:5173",
        ws: true,
        logLevel: "silent",
      })
    );

    // serve up built files from @lentil-jsx/local-client/dist --> @lentil-jsx/local-api/node_modules
    // as local-client is a dependency of local-api
  } else {
    console.log("Serving local-client from local-api...");
    const packagePath = require.resolve(
      "@lentil-jsx/local-client/dist/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  // custom promise to handle the server listening
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
