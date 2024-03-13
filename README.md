# React + TypeScript + Vite
- A CLI to launch an interactive development environment for writing and documenting code.
- A user will be able to use the CLI to launch an interactive development environment inside their browser.
- Users will be able to share their code with others by sharing a URL that points to the interactive development environment.
- A copy of their works can also be saved to their local machine.
- Firebase or mongodb implementation?!!
- Users can choose different themes for their code.
- Supports js, ts, jsx and tsx files.
- Redux for global state management
- babeljs.io & codepen.io for inspiration
- Javascript modules: file that makes some values available to other modules. It does this by exporting them and then importing them into other modules. Can import and export multiple values.
- Transpiling: converting code from one language to another. Babel is a popular transpiler for JavaScript.
- Bundler: read the contents of the entry file, then recursively read the contents of all the files that are imported by the entry file, then read the contents of all the files that are imported by those files, and so on, until it has a complete list of all the files that are needed by the application. Then it combines all of those files into a single file, which is the bundle.
- Transpiling locally: the code is transpiled on the client's machine. Faster code exectution, but slower initial load time. No need to maintain an API server. Less complexity!! What I'll be using. (explain further in the future)
- Raw User Code --> ESBuild (Replaces what Babel and Webpack do) --> Bundle --> Browser: https://esbuild.github.io/ - 100x faster than Webpack and Babel. EsBuild uses Go.
- Once files are downloaded to the cache, they don't need to be downloaded again, unless the user wants to reset his development environment for some reason. The cache is stored in the browser's local storage. 
- Will be using IFrames, so that the user's code doesn't interfere with the code of the development environment. A great way to isolate the user's code from the development environment's code! (Different domains, different access to the DOM)
- Reload iframe sandbox='' --> users cannot reach localStorage, cookies and parent window.
- Using Monaco Editor for web-based code editing. https://microsoft.github.io/monaco-editor/
- Each project can specify another as dependency. (Lerna CLI - similar to Yarn and NPM workspaces)
- When using lerna, do not use yarn or npm to install dependencies. Use lerna add <package-name> to add a dependency to a project.
- Lerna documentation: https://lerna.js.org/
- run `npm start` in the root directory to start the development environment, which will start the development environment for all the projects. (You might want to run `npm install` inside local-client first to install dependencies for the local-client project first. It will be fixed later.)
- use `lerna bootstrap` to install all the dependencies for cli.
- @@TODO: local-client should be configured to work with lerna.
  - Current workaround: run `npm i --legacy-peer-deps` in local-client, then run `npm start` in the root directory.
# Brainstorming
- Mongodb implementation for saving users' code, where users can share their codes and "notebooks" with others. 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list