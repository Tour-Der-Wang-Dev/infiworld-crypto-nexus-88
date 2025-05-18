
# InfiWorld Crypto Hub - Scripts Documentation

This document provides information about the available npm scripts in the project. These scripts are defined in the `package.json` file and can be run using npm, yarn, or bun.

## Available Scripts

### `dev`

Starts the development server using Vite.

```bash
npm run dev
```

**Usage example:**
```bash
npm run dev
```

This will start the development server, typically at http://localhost:8080. The application will automatically reload if you make changes to the source code.

### `build`

Builds the application for production deployment.

```bash
npm run build
```

**Usage example:**
```bash
npm run build
```

This will create an optimized production build in the `dist` directory, which can be deployed to a hosting service.

### `serve`

Serves the built application locally to preview the production build.

```bash
npm run serve
```

**Usage example:**
```bash
# First build the application
npm run build

# Then serve it locally
npm run serve
```

This will serve the production build on a local server, allowing you to test the production version of your app before deployment.

### `lint`

Runs ESLint to check for code quality issues.

```bash
npm run lint
```

**Usage example:**
```bash
npm run lint
```

This will analyze your code for potential errors, style violations, and other issues according to the project's ESLint configuration.

### `lint:fix`

Runs ESLint and automatically fixes issues where possible.

```bash
npm run lint:fix
```

**Usage example:**
```bash
npm run lint:fix
```

This will attempt to automatically fix any linting issues that can be resolved without human intervention.

### `type-check`

Runs TypeScript compiler to check for type errors without emitting compiled code.

```bash
npm run type-check
```

**Usage example:**
```bash
npm run type-check
```

This will verify that all TypeScript types in your project are valid, without actually generating JavaScript output files.

### `test`

Runs the test suite to validate application functionality.

```bash
npm run test
```

**Usage example:**
```bash
npm run test
```

This will execute all tests in the project, ensuring that components and functionality work as expected.

### `test:watch`

Runs the test suite in watch mode, which re-runs tests when files change.

```bash
npm run test:watch
```

**Usage example:**
```bash
npm run test:watch
```

This is useful during development when you want tests to automatically re-run as you make changes to your code.

### `format`

Formats your code using Prettier.

```bash
npm run format
```

**Usage example:**
```bash
npm run format
```

This will format all eligible files in your project according to the Prettier configuration, ensuring consistent code style.

## Workflow Examples

### Development workflow

```bash
# Start development server
npm run dev

# In a separate terminal, run tests in watch mode
npm run test:watch

# Before committing, check types and lint
npm run type-check && npm run lint:fix
```

### Build and preview workflow

```bash
# Build the application
npm run build

# Preview the built application
npm run serve
```

### Continuous Integration workflow

```bash
# Install dependencies
npm install

# Check types
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build the application
npm run build
```

## Using Environment-specific configurations

Some scripts may behave differently based on environment variables. You can set environment variables before running scripts:

```bash
# Development with specific API endpoint
VITE_API_URL=https://dev-api.example.com npm run dev

# Production build with specific configuration
NODE_ENV=production npm run build
```

## Custom Script Extensions

If you need additional functionality, you can extend existing scripts or create new ones in the `package.json` file:

```json
"scripts": {
  "dev:https": "vite --https",
  "analyze": "vite build --mode analyze"
}
```

These can then be run using `npm run dev:https` or `npm run analyze` respectively.
