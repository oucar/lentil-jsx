import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  // if the service is not running, start it
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  // starting the bundling process

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        //   "process.env.NODE_ENV": '"production"',
        "process.env.NODE_ENV": '"process.env.NODE_ENV"',
        global: "window",
      },
      // Replacing the JSX syntax so that users can still import React and use JSX
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: result.outputFiles[0].text,
      error: "",
    };

    // bundling error handling
  } catch (error) {
    const errorMessage = (error as Error).message;
    // console.log(errorMessage);

    return {
      code: "",
      error: errorMessage,
    };
  }
};

export default bundle;
