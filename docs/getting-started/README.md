# Getting Started

Welcome to Fumo! This guide will help you set up and start developing with our FSD Enterprise Foundation.

## 📋 Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Gamza222/fumo.git
cd fumo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template:

```bash
cp config/env/files/env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Fumo
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql

# Monitoring (Optional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### Production Build

```bash
npm run build
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:ci
```

## 🎨 Development Tools

### Storybook

Interactive component development:

```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to explore components.

### Component Generator

Generate new FSD-compliant components:

```bash
npm run generate:component ComponentName layer type "Description"
```

Examples:

```bash
# Generate a shared UI component
npm run generate:component Card shared ui "A card component"

# Generate a widget
npm run generate:component UserProfile widgets ui "User profile widget"

# Generate infrastructure service
npm run generate:component AuthService infrastructure lib "Authentication service"
```

### FSD Validator

Validate architecture compliance:

```bash
npm run validate:fsd
```

## 📁 Project Structure

```
fumo/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── shared/           # Reusable components and utilities
│   ├── widgets/          # Complex UI blocks
│   ├── entities/         # Business entities
│   ├── features/         # Business features
│   └── infrastructure/   # Technical infrastructure
├── config/               # Configuration files
├── docs/                 # Documentation
└── scripts/              # Build and utility scripts
```

## 🎯 Next Steps

1. **Explore Components**: Check out [Components Guide](../components/README.md)
2. **Understand Architecture**: Read [Architecture Overview](../architecture/README.md)
3. **Set Up Development**: Follow [Development Workflow](../development/README.md)
4. **Deploy**: See [Deployment Guide](../deployment/README.md)

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Module not found errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**TypeScript errors:**

```bash
# Check types
npm run type-check
```

### Getting Help

- Check the [Architecture Guide](../architecture/README.md)
- Review [Component Documentation](../components/README.md)
- Look at existing code examples in `src/`
- Check test files for usage patterns

---

**Ready to start building?** Head to the [Architecture Guide](../architecture/README.md) to understand how FSD works!
