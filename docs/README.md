# Fumo - FSD Enterprise Foundation

A production-ready Feature-Sliced Design (FSD) foundation built with Next.js, TypeScript, and enterprise-grade infrastructure.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📚 Documentation

- **[Getting Started](./getting-started/README.md)** - Setup and first steps
- **[Architecture](./architecture/README.md)** - FSD architecture overview
- **[Components](./components/README.md)** - UI components and utilities
- **[Infrastructure](./infrastructure/README.md)** - Technical infrastructure
- **[Development](./development/README.md)** - Development workflow
- **[Deployment](./deployment/README.md)** - Production deployment

## 🏗️ Architecture

This foundation follows **Feature-Sliced Design (FSD)** principles:

```
src/
├── app/           # Next.js App Router pages
├── shared/        # Reusable components and utilities
├── widgets/       # Complex UI blocks
├── entities/      # Business entities
├── features/      # Business features
└── infrastructure/ # Technical infrastructure
```

## ✨ Key Features

- **🎨 Modern UI** - CSS Modules with CVA for type-safe styling
- **🔒 Enterprise Security** - Authentication, authorization, rate limiting
- **📊 Performance Monitoring** - Web Vitals, custom metrics, real-time dashboard
- **🧪 Comprehensive Testing** - 100% test coverage with mock factories
- **🛠️ Developer Tools** - Debug panel, performance monitor, component generator
- **📱 Responsive Design** - Mobile-first approach with accessibility support
- **⚡ Production Ready** - Optimized builds, error handling, monitoring

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + CVA (Class Variance Authority)
- **Testing**: Jest + React Testing Library
- **State**: Zustand
- **Data**: Apollo GraphQL, Axios REST, React Query
- **Monitoring**: Custom performance monitoring + Sentry
- **Security**: Custom auth system with rate limiting

## 📊 Project Stats

- **Components**: 2 UI components (Button, Text)
- **Infrastructure**: 4 core services (Performance, Security, Data, Dev Tools)
- **Tests**: 498 tests across 43 test suites
- **Documentation**: Comprehensive guides and examples
- **Coverage**: 100% component test coverage

## 🤝 Contributing

1. Follow FSD architecture principles
2. Write comprehensive tests
3. Update documentation
4. Follow TypeScript best practices

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ using Feature-Sliced Design**
