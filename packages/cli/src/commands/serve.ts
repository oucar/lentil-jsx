import { Command } from "commander";
import { serve } from "@lentil-jsx/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

interface LocalApiError {
  code: string;
}

// node index.js serve --help
// Different ways to run the serve command:
// node index.js serve book.js --> book.js, 4005
// node index.js serve book.js -p 3000 --> book.js, 3000
// node index.js serve -p 4141 --> notebook.js, 4141
// node index.js serve --port=3000 book.js --> book.js, 3000
// node index.js serve notes/notebook.js --> notebook.js {notes/notebook.js}, 4005
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a notebook for editing!")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}! Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        // Already in use error
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });
