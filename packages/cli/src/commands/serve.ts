import { Command } from "commander";
import { serve } from "@lentil-jsx/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

interface LocalApiError {
  code: string;
}

// Function to handle serve command
const handleServeCommand = async (
  filename = "lentil-jsx-notebook.js",
  options: { port: string }
) => {
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
      `Opened ${filename}! Navigate to http://127.0.0.1:${options.port} to edit the file.`
    );
  } catch (err: any) {
    if (isLocalApiError(err)) {
      // Already in use error
      if (err.code === "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port.");
      }
    } else if (err instanceof Error) {
      console.log("ERROR: ", err.message);
    }
    console.log("Error occurred while trying to open the file: ", err.message);
    process.exit(1);
  }
};

// Create a new commander instance
const program = new Command();

// Define the serve command
const serveCommand = program
  .command("serve [filename]")
  .description(
    "Starts the Lentil-JSX server to host your notebook for editing."
  )
  .option(
    "-p, --port <number>",
    "Specify the port to run the server on. Default is 4005."
  )
  .action(handleServeCommand);

// Define the --help option and attach it to both serve and the main program
const helpMessage = () => {
  console.log("\nUsage:");
  console.log("  $ lentil-jsx serve [filename] [port]");
  console.log("\nOptions:");
  console.log(
    "  <filename>               Creates a JS file in your system and opens it in the browser."
  );
  console.log(
    "                           Make it something unique! Default is 'lentil-jsx-notebook.js.'"
  );
  console.log(
    "  -p, --port <number>      Specifies the port to run the server on. Default is 4005."
  );
  console.log("\nExamples:");
  console.log("  $ lentil-jsx serve");
  console.log("  $ lentil-jsx serve my-notebook.js");
  console.log("  $ lentil-jsx serve --port 8080 my-notebook.js");
  console.log("  $ npx lentil-jsx serve");
  console.log("  $ npx lentil-jsx serve my-notebook.js --port 8080");
};

serveCommand.on("--help", helpMessage);
program.on("--help", helpMessage);

// Parse the command-line arguments
program.parse(process.argv);
