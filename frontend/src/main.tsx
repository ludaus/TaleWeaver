// TaleWeaver frontend - AGPLv3
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./pages/AppShell";
import LoginPage from "./pages/LoginPage";
import ProjectListPage from "./pages/ProjectListPage";
import StoryVersionPage from "./pages/StoryVersionPage";
import EditorPage from "./pages/EditorPage";
import PlayerPage from "./pages/PlayerPage";
import "./styles.css";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<ProjectListPage />} />
            <Route path="projects/:projectId" element={<StoryVersionPage />} />
            <Route path="editor/:versionId" element={<EditorPage />} />
            <Route path="play/:versionId" element={<PlayerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
