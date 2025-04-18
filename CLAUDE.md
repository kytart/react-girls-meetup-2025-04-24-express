# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Frontend: `npm run dev` - start Vite dev server
- Backend: `npm run dev` - start TS Node with auto-reload
- Build all: `npm run build` - TypeScript compilation
- Frontend test: `npm run test` - run Vitest tests
- Backend test: `npm run test` - run Jest tests

## Code Style
- TypeScript strict mode with explicit types
- Component names: PascalCase (PostList.tsx)
- Hooks: camelCase with 'use' prefix (usePosts.ts)
- Types: PascalCase (Post, FetchResult)
- Error handling: Type guards with discriminated unions
- Imports order: React, external deps, internal modules
- Component structure: Functional components with explicit return types
- API pattern: Dedicated API functions with descriptive error messages
- Use try/catch blocks for async operations