# 📚 Project Documentation Hub

## 🚨 **CRITICAL: How We Work - READ THIS FIRST**

### **🏗️ Component Organization Principles**

**EVERY component MUST be properly split according to these rules:**

- **Max component size: 150 lines** - If bigger, you MUST split into hooks/utils/components
- **Max function size: 50 lines** - Extract to utils if longer
- **Logic Component Structure**: Every component follows `ComponentName/index.ts`, `ComponentName.tsx`, `hooks/`, `utils/`, `types/`, `__tests__/`
- **No Monolithic Code**: Never write everything in one giant component

### **🎯 FSD Layer Decision Matrix**

| **If your code is...**             | **Then put it in...**                            |
| ---------------------------------- | ------------------------------------------------ |
| **Reusable across entire app**     | `@shared/ui/` or `@shared/lib/`                  |
| **Reusable within component only** | `ComponentName/utils/` or `ComponentName/hooks/` |
| **Specific to a business entity**  | `@entities/user/` etc.                           |
| **Specific to a feature**          | `@features/auth/` etc.                           |
| **Specific to a page**             | `@pages/home/` etc.                              |

### **📐 Linear Dependency Management**

**CRITICAL RULE**: If Task B depends on Task A, then Task A must be 100% complete before Task B can start.

**Current Dependencies**:

- 🚧 **Priority 1**: ErrorBoundary System Enhancement (MUST complete first)
- ⏸️ **Priority 2**: Suspense Integration (BLOCKED until Priority 1 is 100% done)

**Why**: We build on solid foundations, not unstable ones. No exceptions.

### **🔧 Import Strategy**

```typescript
// ✅ CORRECT - Direct imports from logic components
import { Button } from '@shared/ui/Button';
import { useRetryLogic } from './hooks/useRetryLogic';

// ❌ WRONG - Layer imports or monolithic imports
import { Button } from '@shared/ui';
```

## 🧭 Quick Navigation

### **🎯 Start Here**

- [**📝 How to Document Everything**](./HOW_TO_DOCUMENT.md) - Meta-guide for writing all documentation
- [**📋 Current Tasks**](./planning/tasks.md) - What we're working on now
- [**🗓️ Project Roadmap**](./planning/roadmap.md) - 6-month development plan

### **🏗️ Architecture & Design**

- [**🏛️ FSD Architecture Guide**](./architecture/fsd-architecture.md) - Complete Feature-Sliced Design implementation
- [**📁 File Structure**](./reference/file-structure.md) - Logic Component Structure and organization
- [**🔧 Tech Stack**](./reference/tech-stack.md) - Technology decisions and rationale
- [**📚 Layer Documentation**](./architecture/layers/) - Detailed docs for each FSD layer

### **⚡ Implementation Guides**

- [**⚛️ React Suspense**](./implementation/react/suspense-guide.md) - React 18 Suspense patterns
- [**🛡️ Error Handling**](./implementation/react/error-handling.md) - Error boundary system
- [**🎨 Styling System**](./implementation/styling/) - Tailwind + SCSS patterns _(Coming Soon)_
- [**🗃️ State Management**](./implementation/state-management/) - Apollo + Zustand _(Coming Soon)_
- [**🔧 Tooling Setup**](./implementation/tooling/) - Environment, Storybook, build tools _(Coming Soon)_

### **👨‍💻 Development Workflow**

- [**🔄 Reusability Guide**](./development/reusability-guide.md) - Anti-duplication principles
- [**🧪 Testing Workflow**](./development/testing-workflow.md) - Testing strategy and patterns
- [**📝 Code Quality**](./development/code-quality.md) - Standards and review process _(Coming Soon)_
- [**🌿 Git Workflow**](./development/git-workflow.md) - Branching and PR process _(Coming Soon)_
- [**🎨 Pattern Library**](./development/patterns/) - Established development patterns _(Coming Soon)_

### **🧩 Component Documentation**

- [**🎛️ UI Components**](./components/ui-components/) - Shared component library
- [**📐 Layouts**](./components/layouts/) - Layout system components _(Coming Soon)_
- [**🔗 Composition Patterns**](./components/patterns/) - Component composition guides _(Coming Soon)_

### **⚡ Feature Documentation**

- [**📚 Features Overview**](./features/README.md) - How features are organized and documented
- [**🚨 ErrorBoundary System**](./features/README.md#-in-progress-features) - Error catching, classification, and recovery _(In Progress)_
- [**🔄 SuspenseWrapper**](./features/README.md#-ready-features) - Suspense boundaries with error handling _(Ready)_
- [**🔐 Authentication**](./features/authentication/) - Auth system docs _(Coming Soon)_
- [**👤 User Management**](./features/user-management/) - User features _(Coming Soon)_

### **📖 Quick Reference**

- [**🧩 Available Components**](./reference/available-components.md) - Component inventory
- [**🔧 Available Utilities**](./reference/available-utilities.md) - Utility function reference _(Coming Soon)_
- [**🎭 Available Mocks**](./reference/available-mocks.md) - Testing mock inventory
- [**📦 Import Paths**](./reference/import-paths.md) - Quick import reference _(Coming Soon)_
- [**🚨 Troubleshooting**](./reference/troubleshooting.md) - Common issues and solutions _(Coming Soon)_

### **📊 Planning & Decisions**

- [**🎯 Decision Log**](./planning/decisions.md) - All architectural and technical decisions
- [**📈 Progress Tracking**](./planning/tasks.md#progress-tracking) - Current project status
- [**🔄 Migration Guides**](./reference/migration-guides.md) - Upgrade and migration paths _(Coming Soon)_

---

## 🎯 Documentation Philosophy

> **If we build it, we document it. If we decide it, we record it. If we use it, we explain it.**

### **Our Documentation Principles**

1. **📝 Template-Driven** - Every doc follows established templates for consistency
2. **🔍 Discoverable** - Easy to find through semantic organization and search
3. **🔄 Living Docs** - Updated alongside code changes, never outdated
4. **🎯 Practical** - Focus on actionable guidance and real examples
5. **🤝 Collaborative** - Built for team knowledge sharing and onboarding

### **Documentation Types We Maintain**

- **📖 Reference** - What exists and how to use it
- **🗺️ Guides** - Step-by-step implementation instructions
- **🎯 Decisions** - Why we chose specific approaches
- **🔄 Patterns** - How we consistently solve common problems
- **📋 Workflows** - Process and procedure documentation

---

## 🚀 Getting Started

### **For New Team Members**

1. Read [**How to Document Everything**](./HOW_TO_DOCUMENT.md) to understand our documentation system
2. Review [**FSD Architecture Guide**](./architecture/fsd-architecture.md) for codebase structure
3. Check [**Current Tasks**](./planning/tasks.md) to see what's in progress
4. Explore [**Reusability Guide**](./development/reusability-guide.md) for our development principles

### **For Development Work**

1. Check [**Available Components**](./reference/available-components.md) before creating new ones
2. Follow [**Testing Workflow**](./development/testing-workflow.md) for testing patterns
3. Use [**Decision Log**](./planning/decisions.md) to understand established patterns
4. Reference [**Import Paths**](./reference/import-paths.md) for proper imports

### **For Documentation Contributions**

1. Use templates from [**How to Document Everything**](./HOW_TO_DOCUMENT.md)
2. Follow the semantic folder organization established here
3. Update relevant reference materials (components, utilities, mocks)
4. Cross-link related documentation appropriately

---

## 📁 Folder Organization

Our documentation follows semantic organization for easy discovery:

```
docs/
├── 📝 HOW_TO_DOCUMENT.md          # Meta-documentation guide
├── 📚 README.md                   # This navigation hub
├── 📋 planning/                   # Project planning & tracking
│   ├── tasks.md                   # Current tasks & progress
│   ├── roadmap.md                 # Long-term development plan
│   └── decisions.md               # Decision log & rationale
├── 🏗️ architecture/               # System design & structure
│   ├── fsd-architecture.md        # Feature-Sliced Design guide
│   ├── file-structure.md          # Logic Component Structure
│   ├── tech-stack.md              # Technology choices
│   └── layers/                    # Layer-specific documentation
├── 👨‍💻 development/                 # Dev workflows & patterns
│   ├── reusability-guide.md       # Anti-duplication principles
│   ├── testing-workflow.md        # Testing strategy
│   └── patterns/                  # Development patterns
├── ⚡ implementation/              # Technical implementation guides
│   ├── react/                     # React-specific guides
│   ├── styling/                   # Styling system docs
│   ├── state-management/          # State management patterns
│   ├── testing/                   # Testing implementation
│   └── tooling/                   # Development tools setup
├── 🧩 components/                 # Component documentation
│   ├── ui-components/             # UI component library
│   ├── layouts/                   # Layout system
│   └── patterns/                  # Composition patterns
├── ⚡ features/                   # Feature documentation
│   ├── authentication/           # Auth system docs
│   └── user-management/          # User feature docs
└── 📖 reference/                  # Quick reference materials
    ├── available-components.md    # Component inventory
    ├── available-utilities.md     # Utility function reference
    ├── available-mocks.md         # Testing mock inventory
    ├── import-paths.md            # Import reference
    ├── troubleshooting.md         # Common issues
    └── migration-guides.md        # Upgrade paths
```

---

## 🔄 Documentation Maintenance

### **Keeping Docs Current**

- **🔄 Continuous**: Update docs when code changes
- **📅 Weekly**: Review new documentation for accuracy
- **🗓️ Monthly**: Check links and update examples
- **📊 Quarterly**: Comprehensive documentation audit

### **Quality Standards**

- ✅ All code examples are tested and work
- ✅ Cross-references are accurate and helpful
- ✅ Templates are followed consistently
- ✅ Import statements are included in examples
- ✅ Update dates are maintained

### **Contributing to Documentation**

1. **Follow Templates** - Use established patterns from HOW_TO_DOCUMENT.md
2. **Semantic Organization** - Place docs in appropriate folders
3. **Cross-Link** - Reference related documentation
4. **Test Examples** - Ensure all code examples work
5. **Update Navigation** - Add new docs to this README

---

## 🎯 Success Metrics

We track documentation success through:

- **📊 Coverage**: 100% of public APIs documented
- **🔍 Discoverability**: <5 minutes to find relevant info
- **🎯 Accuracy**: All examples work when copy-pasted
- **🔄 Freshness**: Docs updated within 1 week of code changes
- **👥 Usability**: New developers can onboard in <1 day

---

**📅 Last Updated**: Documentation restructure completion  
**👥 Maintained by**: Development Team  
**🔄 Next Review**: After layer documentation completion

**💡 Need help?** Check [Troubleshooting](./reference/troubleshooting.md) or ask in team chat!
