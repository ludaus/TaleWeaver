// TaleWeaver backend - AGPLv3
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import storyVersionRoutes from "./routes/storyVersions.js";
import storyNodeRoutes from "./routes/storyNodes.js";
import storyLinkRoutes from "./routes/storyLinks.js";
import mediaRoutes from "./routes/media.js";
import commentRoutes from "./routes/comments.js";
import shareLinkRoutes from "./routes/shareLinks.js";
import playerRoutes from "./routes/player.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/projects/:projectId/story-versions", storyVersionRoutes);
app.use("/story-versions/:versionId/nodes", storyNodeRoutes);
app.use("/story-versions/:versionId/links", storyLinkRoutes);
app.use("/media", mediaRoutes);
app.use("/comments", commentRoutes);
app.use("/share-links", shareLinkRoutes);
app.use("/player", playerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`TaleWeaver backend listening on port ${PORT}`);
});
