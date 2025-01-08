# Dogfinder Project

## Overview

Dogfinder is a modern web application designed with React and Vite. It includes essential tools for development and testing, such as TypeScript, Jest, ESLint, and TailwindCSS. This guide will walk you through setting up the project.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) and npm (Node Package Manager)
- **Git** (to clone the repository)

---

## Installation Guide

### Environment Variables

If the project requires environment variables, follow these steps:

1. Create a `.env` file in the root directory of the project.
2. Add the required environment variables as key-value pairs, e.g.,
   ```env
   API_URL=https://api.example.com
   SECRET_KEY=your-secret-key
   ```

Refer to the project documentation for details about necessary variables.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd dogfinder
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

---

## Development

### Start the Development Server

To start the development server and run the application:

```bash
npm run dev
```

This will start a local development server at `http://localhost:3000` (or another available port).

---

## Building for Production

To build the project for production:

```bash
npm run build
```

The build output will be available in the `dist` directory.

### Configure Jest

Ensure Jest is configured correctly for your TypeScript and React project. Refer to `jest.config.js` for custom configurations.

---

## Linting and Formatting

### Lint the Code

To lint your code using ESLint:

```bash
npm run lint
```

### Format the Code

To format your code using Prettier:

```bash
npm run format
```

---

## Git Hooks

The project uses Husky and lint-staged to enforce pre-commit checks. These checks include:

1. Linting TypeScript files
2. Formatting the code
3. Running tests

To prepare Husky for use:

```bash
npm run prepare
```

---

## Styling

This project uses TailwindCSS for styling due to its utility-first approach, which allows rapid prototyping and the creation of consistent, responsive designs. Additionally, ShadCN UI was chosen as the design system for this project. It provides pre-built, customizable components, making it easy to maintain a cohesive and polished UI while saving development time. TailwindCSS and ShadCN UI together streamline the design process and ensure flexibility. To learn more about configuring TailwindCSS, refer to the `tailwind.config.js` file.

---

## State Management

This project uses TanStack Query for data fetching and state management. TanStack Query was chosen for its powerful features, such as automatic caching, background updates, and support for complex asynchronous workflows. It simplifies server state management and integrates seamlessly with React, making it easier to handle data-fetching logic and ensure an optimized user experience.

---

## Project Structure

- **`.husky/`**: Contains Git hooks for pre-commit and other Git-related workflows.
- **`node_modules/`**: Auto-generated folder containing project dependencies.
- **`public/`**: Static files served by the application.
- **`src/`**: The source code for the project.
  - **`api/`**: Contains API-related logic or services.
  - **`assets/`**: Static assets such as images and fonts.
  - **`components/`**: Reusable UI components.
  - **`lib/`**: Utility functions or libraries.
  - **`pages/`**: Page-level components for routing.
  - **`repository/`**: Data access logic or repository pattern implementation.
  - **`types/`**: TypeScript type definitions.
- **Root files**:
  - `.env`: Environment variables.
  - `package.json`: Project metadata and dependencies.
  - `README.md`: Documentation for the project.
  - `tailwind.config.js`: Tailwind CSS configuration file.
  - `tsconfig*.json`: TypeScript configuration files.
  - `vite.config.ts`: Configuration for Vite build tool.

This structure provides an organized overview of the project's layout, helping contributors navigate and understand the codebase effectively.

---

## Troubleshooting

1. **Husky Installation**: Run `npm run prepare` if Husky hooks are not working as expected.

---

## Enhance

1. **For main page**:

- Load more 10 images in background and save to the queue, when user vote current breed, the next one will be taken from queue.
- When the queue is less than 6 breeds, will fetch more 10 images

  **Results**: improve user experience no need to wait for api too long

2. **For voted latest**:

- Only fetch api in the first time visit page to get 2 latest breeds which voted before
- After each vote breed action, push breed info to list voted latest also that help to do not call api => more user friendly
