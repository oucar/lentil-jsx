import { Command } from "commander";
import { serve } from "local-api";
import path from 'path';


// node index.js serve --help
// Different ways to run the serve command:
// @@TODO: Documentation
// node index.js serve book.js --> book.js, 4005
// node index.js serve book.js -p 3000 --> book.js, 3000
// node index.js serve -p 4141 --> notebook.js, 4141
// node index.js serve --port=3000 book.js --> book.js, 3000
// node index.js serve notes/notebook.js --> notebook.js {notes/notebook.js}, 4005
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a notebook for editing!")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
