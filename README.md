# WORK IN PROGRESS: Azure Functions TypeScript Template
⚠️ Warning: Not yet officially supported by the Azure Functions product group. Please provide feedback :) ⚠️

Azure Functions wants to support better TypeScript development. This repo is an initial prototype for baked-in TypeScript templates you can get with commands like `func init`.

Current functions and dependency on lodash would not be there.

# TODO:
- are extensions scripts flexible enough with coming bundling changes?
- test on Windows
- Confirm npm run watch is working as expected
- debug experience?? (VS Code integration) - see https://github.com/Azure/azure-functions-host/issues/3415, which results in https://github.com/Azure/azure-functions-host/issues/3543 
- remove dependency on `func` for production build?
  - maybe include dependencies per script

⬇️ ⬇️ ⬇️  actual README below  ⬇️ ⬇️ ⬇️

# Azure Functions ❤️'s TypeScript 
This template is starting point for creating serverless Azure Functions written in TypeScript. The TypeScript Function app is contained in `src` by default. Build outputs are written to `dist` by default. All code changes should be made inside of `src`. However, code will execute from `dist`.

## Prerequisites
  - Install latest Active LTS version of [Node.js](https://nodejs.org)
  - Install latest [azure-functions-core-tools](https://www.npmjs.com/package/azure-functions-core-tools) if you do not already have it.
    - `npm install -g azure-functions-core-tools` 
  - Run `npm install` from project root to install dev dependencies. 

## The basics
This template comes with a number of npm scripts to help build and deploy your TypeScript project.

### Build
To build this Function app run `npm run build`. (Note that `npm run start` already includes a build step.) 

If you are using binding extensions, you may need to run `npm run install:extensions` as well. This command reads function.json files to see which extension packages you need, installs them, and rebuilds the extensions project.

### Run
To run your code, use `npm run start`. This command builds your Function app, starts the Azure Functions host to run your code, and watches `src` for code changes.

### Develop
`npm run clean` removes your build output folder and its contents. `npm run test` can be implemented to test your code.

### Deploy
To create a self-contained, deployable payload in your build output folder, use `npm run build:production`. If you already have a deployed Function app and want to update its contents, you can use `npm run publish:update`. The `name` property in package.json must be the same as the name of your deployed Function app.

## Adding to your Function app
This template is intended to be the easiest and quickest way to get started, but your project may require more customization. Understanding the following topics can help you do so.

### Run other `func` commands
Although Azure Functions Core Tools (the `func` CLI) is abstracted by npm scripts, you may still find a need to use these commands (read more on [working with Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)). You can do so by running `func` commands with the `--prefix` option and appropriate target directory. 

```
func [context] [context] <action> --prefix <dirName>
```

When choosing which directory to run from, remember that all code changes should be made inside of `src` and that code will execute from `dist`. 

For example, 
```
func host start --prefix dist
```
and
```
func extensions install --prefix src --package Microsoft.Azure.WebJobs.ServiceBus --version <target_version>
```

### Configure the build output directory with `outDir`
Your build output directory is defined in `package.json` and `tsconfig.json` as the value of `outDir`. By default, this value is `dist`.

If you change `outDir`, be sure to add the new build output directory to .gitignore.

### Configure the source directory
Your source directory is defined in `package.json` and `tsconfig.json`. In `package.json`, it is the value of `rootDir`. In `tsconfig.json`, it is the directory listed under `include`. By default, the source directory is `src`.

## Npm scripts
#### `npm run build`
Builds the Function app to the build output folder for local execution. (Note that you may still need to run `npm run install:extensions` for local execution.)

#### `npm run build:production`
Builds the Function app and its dependencies to the build output folder for deployment. This build output is fully self-contained, and only App Settings may need to be configured when deployed.

#### `npm run build:configFiles`
Copies the .json and .csproj files needed in the Function app to the build output folder.

#### `npm run build:extensions`
Generates the appropriate extensions artifacts for the extensions registered in extensions.csproj.

#### `npm run install:extensions`
Installs extension packages from reading `function.json` files and from reading your `extensions.csproj` file. This command works by running `func extensions install` in the build output folder. Newly detected extensions will automatically be added to `src/extensions.csproj`.

#### `npm run install:extensions:force`
Installs the latest available extension packages to your project. This command works by running `func extensions install --force` in the build output folder. Note that all extension package versions in your `src/extensions.csproj` will be increased to the latest version.

#### `npm run start`
Builds and runs your Function code. This command builds your Function app, starts the Azure Functions host to run your code, and watches `src` for code changes.

#### `npm run start:host`
Runs your Function code on the Azure Functions host.

#### `npm run watch`
Rebuilds `dist` on code changes made in `src`. 

#### `npm run clean`
Removes your build output folder and its contents.

#### `npm run test`
This can be implemented to test your code. The `publish:update` script executes the `test`.

#### `npm run publish:update`
Deploys updated code to an already deployed Function app. The `name` property in package.json must match the name of your deplotyed Function app.

## Learn More
If you are getting started with Azure Functions, you can follow this tutorial to [create and deploy your first JavaScript function](https://docs.microsoft.com/azure/azure-functions/functions-create-first-function-vs-code). We recommend that you use Visual Studio Code and the [Azure Functions extension](https://code.visualstudio.com/tutorials/functions-extension/getting-started).

The [Azure Functions developer guide](https://docs.microsoft.com/azure/azure-functions/functions-reference) and the [JavaScript-specific developer guide](https://docs.microsoft.com/azure/azure-functions/functions-reference-node) are good resources to gain an understanding of more Azure Functions concepts.
