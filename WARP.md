# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

- Repository name: `lifeline`.
- Current state: initial implementation in progress.
- Source layout:
  - `backend/` – Node.js + Express API written in TypeScript (entry: `src/server.ts`, build to `dist/`).
  - `mobile/` – Expo React Native app (entry: `App.tsx`).

The root `README.md` documents how to run the backend API and the mobile app.

## Tooling and commands

Current tooling:

- Backend (`backend/`):
  - `npm install`
  - `npm run dev` – run backend in watch mode via ts-node-dev.
  - `npm run build` – compile TypeScript to `dist/`.
  - `npm start` – run compiled backend.

- Mobile (`mobile/`):
  - `npm install`
  - `npm run start` – run Expo dev server.
  - `npm run android` / `npm run ios` / `npm run web` – platform-specific Expo entry.

Future agents should:

1. Extend backend tooling (linters, tests, Prisma, etc.) as needed.
2. Extend mobile tooling (testing, i18n, voice guidance) as features are added.
- List files at the repo root:
  - `ls`

Once a stack is selected and initialized (for example, by adding a `package.json`, `pyproject.toml`, or framework-specific config), future agents should:

1. Inspect the new tooling files to derive the authoritative dev commands (build, run, lint, test, run a single test, etc.).
2. Update this `WARP.md` to document those commands explicitly.

## Architecture and structure

There is currently **no implemented application architecture** in this repository:

- No main entrypoint or application module exists yet.
- No domain, service, or UI layers are present.

As the project grows and real code is added, future agents should:

1. Identify the primary source directories (for example, `src/`, `app/`, `backend/`, `frontend/`, etc.).
2. Infer and briefly summarize the high-level architecture (modules, major components, data flow) based on those directories and key entrypoints.
3. Capture that high-level picture here, without enumerating every file.
