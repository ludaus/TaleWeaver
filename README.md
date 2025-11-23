# TaleWeaver

TaleWeaver is an open-source web platform for creating, editing, playing, and sharing interactive node-based stories. It ships with a PostgreSQL-backed API, a React + TypeScript editor, and a simple story player. All code is licensed under the GNU Affero General Public License v3.0.

## Project Structure

- `backend/` – Express + TypeScript API with Prisma models for users, projects, story versions, nodes, links, media, share links, and reviewer comments.
- `frontend/` – Vite + React application containing the editor, player, and supporting views.
- `shared/` – Shared TypeScript types used across both layers.
- `media/` – Local development storage area for uploaded files.
- `LICENSE` – Full AGPLv3 license text.

## Getting Started

### Backend

1. Set `DATABASE_URL` and `JWT_SECRET` in your environment.
2. Install dependencies and generate the Prisma client:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The API listens on port `4000` by default and exposes routes for authentication, projects, story graph CRUD, media uploads, share links, reviewer comments, and player endpoints.

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Launch the development server:
   ```bash
   npm run dev
   ```
   By default Vite serves the app on `http://localhost:5173`.

## Authentication

- Users can register or log in via `/auth/register` and `/auth/login`.
- JWT bearer tokens secure protected routes; include `Authorization: Bearer <token>` on requests.
- Admin-only user management endpoints live under `/users`.

## Editor and Player

- Graph view uses React Flow to visualize story nodes and connections.
- Node list and editor panes keep selections synchronized, with basic text block editing.
- Player renders text blocks sequentially, offers choice buttons ordered by `orderIndex`, and reports completion through a stub endpoint.

## License

This project is licensed under the GNU Affero General Public License v3.0. See [LICENSE](./LICENSE) for details. All source files include AGPLv3 notices where conventional.
