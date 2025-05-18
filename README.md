
# InfiWorld Crypto Hub

InfiWorld Crypto Hub is a comprehensive platform for cryptocurrency enthusiasts, providing maps of crypto-friendly locations, a marketplace for crypto transactions, freelance opportunities, travel reservations with crypto payments, and identity verification services.

![InfiWorld Logo](/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:

```bash
# Using HTTPS
git clone <repo-url>

# Using SSH
git clone git@<repo-url>
```

2. Navigate into the project directory:

```bash
cd infiworld-crypto-hub
```

3. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

4. Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

5. Open your browser and navigate to `http://localhost:8080` to see the app running.

## 🛠️ Technologies Used

- **[React](https://reactjs.org/)**: Front-end library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Static type-checking for JavaScript
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)**: Re-usable UI components
- **[React Router](https://reactrouter.com/)**: Navigation and routing for React applications
- **[Tanstack React Query](https://tanstack.com/query/latest)**: Data fetching and state management
- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)**: Interactive, customizable maps
- **[React Hook Form](https://react-hook-form.com/)**: Form state management and validation
- **[Zod](https://github.com/colinhacks/zod)**: TypeScript-first schema validation
- **[Lucide React](https://lucide.dev/guide/packages/lucide-react)**: Beautiful & consistent icons

## 📂 Project Structure

The project follows a modular structure:

- `src/`: Source code of the application
  - `components/`: Reusable UI components
  - `components/ui/`: Shadcn UI components
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions and helpers
  - `pages/`: Page components for routing
- `public/`: Static assets

For a detailed breakdown of all files, see [filesExplainer.md](./filesExplainer.md).

## 🧪 Running Tests

```bash
# Using npm
npm run test

# Using yarn
yarn test

# Using bun
bun test
```

## 🚢 Deployment

The application can be built for production using:

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using bun
bun run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

We welcome contributions to InfiWorld Crypto Hub! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please make sure your code follows our coding standards and includes appropriate tests.

### Coding Standards

- Use consistent naming conventions
- Write descriptive comments
- Follow TypeScript best practices
- Use meaningful variable and function names
- Keep components small and focused on a single responsibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- The Shadcn UI team for their excellent component library
- The React community for their continuous support and innovation
- All contributors who have helped shape this project
