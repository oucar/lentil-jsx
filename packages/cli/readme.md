# Lentil-jsx 
- [lentil-jsx npm](https://www.npmjs.com/org/lentil-jsx)

Lentil-jsx is a robust npm package, offering a powerful CLI tool meticulously designed for React development. With support for both TypeScript and JavaScript, developers can effortlessly create components, objects, write algorithms, brainstorm, and seamlessly document their code in an interactive environment. Seamlessly blending the capabilities of a code editor and documentation platform, lentil-jsx serves as a dynamic notebook, empowering users to compose and document code effortlessly.

Lentil-jsx provides developers with a valuable tool for React development. Built on a reliable foundation and modern technology stack, it ensures seamless compatibility across major browsers. Leveraging Esbuild for bundling user code and its own packages, lentil-jsx guarantees smooth performance and ease of use.

Upon installation, lentil-jsx not only delivers its own set of features but also grants access to previously installed npm packages. Each npm package is stored alongside lentil-jsx, enabling developers to harness their entire toolkit with ease.

## Inspiration

Lentil-jsx draws inspiration from platforms like [babeljs.io](https://babeljs.io/) and [codepen.io](https://codepen.io/), aiming to provide a user-friendly yet powerful environment for developers to write, document, and share code effortlessly.

## Features
- **Transpiling Locally:** Code is transpiled on the client's machine, offering faster code execution and slower initial load times. No need for maintaining an API server, resulting in reduced complexity.
- **Caching:** NPM packages are cached locally, eliminating the need for repeated downloads and enhancing performance. Cached files are stored in the browser's local storage.
- **Raw User Code:** User code is processed using Babel and Webpack, traditionally responsible for transpiling and bundling code. However, in lentil-jsx, these functionalities are replaced by ESBuild for significantly faster bundling speeds, up to 100x faster than Webpack and Babel combined. ESBuild, written in Go, ensures efficient code bundling and optimization before delivering the bundle to the browser. For more information on ESBuild, visit [ESBuild's official website](https://esbuild.github.io/).
- **Concurrent Usage:** Multiple lentil-jsx instances can be run simultaneously using different ports, enabling users to work on multiple projects concurrently. Each instance is isolated from the others, ensuring a secure and interference-free coding experience.


## Usage
- When running from an installed npm package - after installing the package globally, use `lentil-jsx serve [options] [command]` or `lentil-jsx serve [options] [command]` directly. You can always use `lentil-jsx help` or `lentil-jsx serve --help` for more information.
- When you first run `lentil-jsx serve`, the CLI will create a new notebook file named `lentil-jsx-notebook.js` and based on the options you passed (file name, port number, etc.) there will be a console message indicating the file name and port number. The initial notebook will contain some examples to get you started on Lentil-JSX. You can then open the notebook file in your code editor and start writing your code.
- Moving, updating, creating or deleting the text and/or code cell components automatically saves your progress in the notebook file. Therefore you can always close the notebook and open it later to continue where you left off. In order to open a notebook file, you just need to pass the notebook file name as an argument to the `lentil-jsx serve` command.
- Deleting Lentil-JSX from your machine will delete all the notebook files and the cache. Therefore, it is recommended to back up your notebook files before deleting Lentil-JSX.
- Below are some usage options: 
  - `lentil-jsx serve` - Start the Lentil-JSX server with default settings.
  - `npx lentil-jsx serve` - Start the Lentil-JSX server with default settings.
  - `lentil-jsx serve my-notebook.js` - Start the Lentil-JSX server using `my-notebook.js` as the notebook file.
  - `lentil-jsx serve -p 8080 my-notebook.js` - Start the Lentiil-JSX server on port 8080 using `my-notebook.js` as the notebook file.
  - `npx lentil-jsx serve my-notebook.js -p 8080` - Start the Lentil-JSX server on port 8080 using 'my-notebook.js' as the notebook file.
  - `lentil-jsx serve -p 8080` - Start the Lentil-JSX server on port 8080 with the default notebook name.

## Technology
- **Dependency Management:** Adopts the Lerna CLI for managing project dependencies in a monorepo pattern, facilitating efficient development and versioning.
- **Lerna Migration:** Recently migrated to Lerna version 8, offering improved package management functionalities.
- **Transpiling:** Code is transpiled from one language to another using Babel, enhancing compatibility and enabling usage of modern syntax.
- **Bundling:** Utilizes ESBuild to bundle code efficiently, replacing the functionalities of Babel and Webpack. ESBuild offers significantly faster bundling speeds compared to traditional bundlers.
- **IFrames:** Uses IFrames to isolate user code from the development environment, ensuring a secure and interference-free coding experience.
- **Monaco Editor:** Integrates the Monaco Editor for web-based code editing, offering powerful features and functionalities.
- **Global State Management:** Utilizes Redux for efficient global state management.
- **Language Agnostic:** Supports both JavaScript (JS) and TypeScript (TS), ensuring that any code or component written in lentil-jsx is compatible and ready to be seamlessly integrated into a React project, whether it's JSX or TSX.

![lentil-jsx simple diagram](./docs/lentil-jsx-diagram.svg)

- **Current Package Dependencies:**
    - `cli` --> `local-api`
    - `local-api` --> `local-client`

- **CLI:**
  - Starts up the local API
  - Starts up the local client
  - Publishes a notebook to the Public API
- **Local API:**
  - Serves up the React app
  - Saves and loads cells from a file, creates notebooks
- **React App:**
  - Code editing, previewing, displaying, and bundling
  - Communicates with the local API 
  - Makes production assets available to the local API or the public API (for future use)


## Setting Up the Project for Production

Below are the steps for setting up the project and getting it ready for production, or deploying it to npm. After following all these steps, a production build of the application can be run directly inside `@lentil-jsx/cli/dist/` using the command `node index.js serve`, or with using the options. This command will be translated into `npx lentil-jsx serve` or `lentil-jsx serve` when the package is installed globally using npm.

- Run `lerna clean`
- Optionally, `dist` directories can be removed from all packages.
- Run `npm i --legacy-peer-deps` in `@lentil-jsx/local-client`
- If `@lentil-jsx/local-client` has any changes, do not forget to run `npm run build` for it.
- If `@lentil-jsx/local-client` has any tailwindcss changes, run `npm run build:css`.
- Run `lerna bootstrap` to install other dependencies and link packages.
- Run `npm run prepublishOnly` in `@lentil-jsx/local-api`
- Run `npm run prepublishOnly` in `@lentil-jsx/cli`


## Future Ideas?!

- Mongodb implementation for saving users' code, where users can share their codes and "notebooks" with others.


## Fun Fact 
- Lentil-JSX is named after my cat, Lentil, who is always by my side when I am coding. He is a great companion and a source of inspiration for me. He loves eating corn. 🌽