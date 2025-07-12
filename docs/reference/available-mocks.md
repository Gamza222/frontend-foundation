# 🎭 Available Mocks

## 📋 Overview

This document provides a complete inventory of all shared mocks available in our testing environment. The primary goal is to promote reusability and avoid duplicating mock implementations across different test files.

> **Rule**: Always check this list before creating a new mock. If a suitable mock exists, use it. If you need a new, reusable mock, add it to the `config/jest/mocks/` directory and document it here.

---

## 🌎 **Browser API Mocks**

Mocks for standard browser features.

| Mock                       | Location                                          | Use Case                                                        |
| -------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| **`Location`**             | `browser/lib/location/location.mock.ts`           | Mocks `window.location` with spies for `reload`, `assign`, etc. |
| **`IntersectionObserver`** | `browser/lib/media/intersection-observer.mock.ts` | Mocks the `IntersectionObserver` API.                           |
| **`matchMedia`**           | `browser/lib/media/match-media.mock.ts`           | Mocks `window.matchMedia` for responsive design testing.        |
| **`Navigator`**            | `browser/lib/navigator/navigator.mock.ts`         | Mocks `window.navigator`, including clipboard API.              |
| **`Storage`**              | `browser/lib/storage/storage.mock.ts`             | Mocks `localStorage` and `sessionStorage`.                      |

**Note**: Many of these are applied globally in the Jest setup.

---

## 📡 **API Mocks**

Mocks for network clients and API communication.

| Mock                | Location                                | Use Case                                              |
| ------------------- | --------------------------------------- | ----------------------------------------------------- |
| **`GraphQLClient`** | `api/lib/graphql/GraphQLClient.mock.ts` | Provides a mock implementation of the GraphQL client. |
| **`WebSocket`**     | `api/lib/websocket/WebSocket.mock.ts`   | Mocks the `WebSocket` client for real-time testing.   |

---

## 🖼️ **Asset Mocks**

Mocks for static assets like images and files. These are typically configured in `jest.config.js` to handle asset imports.

| Mock        | Location                           | Use Case                             |
| ----------- | ---------------------------------- | ------------------------------------ |
| **`Image`** | `assets/components/Image.mock.tsx` | Mocks Next.js `<Image>` component.   |
| **`Svg`**   | `assets/components/Svg.mock.tsx`   | Mocks SVG imports.                   |
| **`file`**  | `assets/lib/file.mock.ts`          | Generic mock for other file imports. |

---

## 🎯 **How to Use Mocks**

1.  **Check this document** to see if a mock already exists.
2.  **Import the mock** into your test file if it's not globally available.
3.  **Use `jest.mock()`** to mock the module, pointing to the shared mock if necessary. For globally configured mocks, they should work out of the box.

### **Example: Mocking a module with a shared mock**

```typescript
import { GraphQLClientMock } from '@/config/jest/mocks/api/lib/graphql/GraphQLClient.mock';

jest.mock('@/shared/api/graphql', () => ({
  GraphQLClient: GraphQLClientMock,
}));
```

### **Adding a New Mock**

1.  **Create the mock** in the appropriate subdirectory within `config/jest/mocks/`.
2.  **Follow the existing structure** (`lib`, `types`, etc.).
3.  **Add the new mock** to this document with its location and use case.
4.  **Update the `testing-workflow.md`** if the new mock introduces a new pattern.
