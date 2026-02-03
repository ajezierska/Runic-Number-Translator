# Runic Number Translator

A React application to convert decimal numbers (0-9999) to their runic representation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev

# Open browser at http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Code Quality

```bash
# Run ESLint to check for code issues
npm run lint

# Run ESLint and automatically fix issues
npm run lint:fix
```


## 📁 Project Structure

```
runic-app/
├── src/
│   ├── components/      # React components
│   ├── utils/          # Utility functions (conversion, SVG generation)
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # Constants (runic line definitions)
│   ├── __tests__/      # Test files
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── helpers/            # Helper files (examples, images)
├── index.html          # HTML template
```

## 🔧 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 with TypeScript and React plugins
- **Version Control**: Git
