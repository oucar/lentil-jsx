import { Command } from "commander";
import { serve } from "@lentil-jsx/local-api";
import path from "path";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";

interface LocalApiError {
  code: string;
}

// Function to handle serve command
const handleServeCommand = async (
  filename = "lentil-jsx-notebook.js",
  options: { port: string },
  content?: string
) => {
  const isLocalApiError = (err: any): err is LocalApiError => {
    return typeof err.code === "string";
  };

  try {
    const dir = path.join(process.cwd(), path.dirname(filename));

    // Write the content to the file if provided, or use default content
    const fileContent =
      content ||
      JSON.stringify([
        {
          content:
            "🌟 **Welcome to Lentil-JSX!** 🚀\n\nLet's take a quick tour of our amazing application, but don't worry, I'll keep it simple for you!\n\n📦 **No Imports Needed:** You don't need to import `React` or `ReactDOM` into your code cells because we've got you covered! Importing them again won't hurt, though. Esbuild is smart enough not to load `'react'` if it's already been loaded.\n\n🎨 **Interactive Code Cells:** Take a look at the code cell below where we import `'react'` and `'react-chartjs-2'` to create a simple yet effective Bar and Line charts.\n\n🤝 **Cumulative Code Sharing:** With Lentil-JSX, you can enjoy cumulative code-sharing, allowing you to access components and declarations from previous code cells effortlessly!\n\nLet's dive in and explore the possibilities! 🚀",
          type: "text",
          id: ".demo0000",
        },
        {
          content:
            "📊 **Let's begin**! \n\nIn the following code cell, we'll demonstrate how to create a `BarChart` component using React and Chart.js. We'll start by defining a `data` array, which contains objects with labels and their corresponding values. This data will be visualized in the `BarChart` using the built in `display()` method.",
          type: "text",
          id: ".demo0001",
        },
        {
          content:
            "import { Bar } from 'react-chartjs-2';\n\nconst data = [\n  { label: 'January', value: 300 },\n  { label: 'February', value: 450 },\n  { label: 'March', value: 600 },\n  { label: 'April', value: 700 },\n  { label: 'May', value: 550 },\n  { label: 'June', value: 800 },\n];\n\nconst BarChart = () => {\n  const chartData = {\n    labels: data.map((item) => item.label),\n    datasets: [\n      {\n        label: 'Value',\n        backgroundColor: 'rgba(75,192,192,0.2)',\n        borderColor: 'rgba(75,192,192,1)',\n        borderWidth: 1,\n        hoverBackgroundColor: 'rgba(75,192,192,0.4)',\n        hoverBorderColor: 'rgba(75,192,192,1)',\n        data: data.map((item) => item.value),\n      },\n    ],\n  };\n\n  return <Bar data={chartData} />;\n};\n\ndisplay(<BarChart />);",
          type: "code",
          id: ".demo0002",
        },
        {
          content:
            "🌟 **Check this out!**\n\n🥁 Remember that awesome `data` array we set up a moment ago? Well, brace yourself for the magic. With Lentil-JSX's slick cumulative code feature, we're about to level up our data visualization game. We'll jazz up our labels by adding the cool factor of 2024 to each one. After all, who doesn't love fancy charts, right? So, we'll flaunt our data in a mesmerizing line chart. Ready for the ride? Let's dive in and elevate our visualization skills! 🚀",
          type: "text",
          id: ".demo0003",
        },
        {
          content:
            "import { Line } from 'react-chartjs-2';\n\nconst updatedData = data.map((item) => ({\n  ...item,\n  label: `${item.label} 2024`,\n}));\n\nconst LineChart = () => {\n  const chartData = {\n    labels: updatedData.map((item) => item.label),\n    datasets: [\n      {\n        label: 'Value',\n        fill: false,\n        lineTension: 0.1,\n        backgroundColor: 'rgba(75,192,192,0.4)',\n        borderColor: 'rgba(75,192,192,1)',\n        borderCapStyle: 'butt',\n        borderDash: [],\n        borderDashOffset: 0.0,\n        borderJoinStyle: 'miter',\n        pointBorderColor: 'rgba(75,192,192,1)',\n        pointBackgroundColor: '#fff',\n        pointBorderWidth: 1,\n        pointHoverRadius: 5,\n        pointHoverBackgroundColor: 'rgba(75,192,192,1)',\n        pointHoverBorderColor: 'rgba(220,220,220,1)',\n        pointHoverBorderWidth: 2,\n        pointRadius: 1,\n        pointHitRadius: 10,\n        data: data.map((item) => item.value),\n      },\n    ],\n  };\n\n  return <Line data={chartData} />;\n};\n\ndisplay(<LineChart />);",
          type: "code",
          id: ".demo0004",
        },
        {
          content:
            "🎨  **Get Creative!**\n\nNow that you've had a taste of what Lentil-JSX can do, it's time to unleash your creativity! With an array of features at your fingertips, there's no limit to what you can achieve.\n\n🧪 **Experiment Away!**\n\nTry mixing and matching different components, tweaking parameters, and exploring new data sets. Whether you're a seasoned developer or just starting out, Lentil-JSX offers endless possibilities for experimentation. Did you know that `display()` method can actually display all the components that is passed in? What about objects, or even arrays? Well, now you try them out!\n\n🚀 **Push Boundaries!**\n\nDon't be afraid to push the boundaries of what you think is possible. Break out of your comfort zone, challenge yourself to try new techniques, and see where your imagination takes you. Found a bug? Well done! Don't forget to let me know [here](https://github.com/oucar/lentil-jsx/issues). Remember, this is an open source project and I can't do much without you!\n\n🔥 Let's Go!\n\nThe only limit is your imagination. So what are you waiting for? Dive in, explore, and let your creativity soar with Lentil-JSX!",
          type: "text",
          id: ".demo0005",
        },
      ]);

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, fileContent);

    console.log(options);
    const port = options && options.port ? parseInt(options.port) : 4005;

    await serve(port, path.basename(filename), dir, !isProduction);

    console.log(`Created ${filename} in ${dir}!`);
    console.log(
      `Opened ${filename}! Navigate to http://127.0.0.1:${port} to edit the file.`
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

// Define the serve command
export const serveCommand = new Command()
  .command("serve [filename] [port]")
  .description(
    "Starts the Lentil-JSX server to host your notebook for editing.\n" +
      "Usage: lentil-jsx serve [filename] [port]\n" +
      "\nArguments:\n" +
      "  [filename]                Optional. Specifies the name of the notebook file.\n" +
      "                            If not provided, a default file 'lentil-jsx-notebook.js' will be created.\n" +
      "  [port]                    Optional. Specifies the port number for the server.\n" +
      "                            Default port is 4005.\n"
  )
  .option(
    "-p  <number>",
    "Specifies the port to run the server on. Default is 4005."
  )
  .action((filename, options) => {
    handleServeCommand(filename, options);
  })
  .on("--help", () => {
    console.log("\nExamples:");
    console.log("  $ lentil-jsx serve");
    console.log("      Start the Lentil-JSX server with default settings.");
    console.log("");
    console.log("  $ lentil-jsx serve my-notebook.js");
    console.log(
      "      Start the Lentil-JSX server using 'my-notebook.js' as the notebook file."
    );
    console.log("");
    console.log("  $ lentil-jsx serve --p 8080 my-notebook.js");
    console.log(
      "      Start the Lentil-JSX server on port 8080 using 'my-notebook.js' as the notebook file."
    );
    console.log("");
    console.log("  $ npx lentil-jsx serve");
    console.log("      Start the Lentil-JSX server using npx.");
    console.log("");
    console.log("  $ npx lentil-jsx serve my-notebook.js --port 8080");
    console.log(
      "      Start the Lentil-JSX server on port 8080 using 'my-notebook.js' as the notebook file."
    );
  });
