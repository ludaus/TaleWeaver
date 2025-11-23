// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

const router = express.Router();

router.get(
  "/story/:versionId",
  asyncHandler(async (req, res) => {
    const version = await prisma.storyVersion.findUnique({
      where: { id: req.params.versionId },
      include: {
        nodes: { include: { outgoingLinks: true, comments: true } },
        links: true
      }
    });
    if (!version) return res.status(404).json({ message: "Story version not found" });
    res.json(version);
  })
);

router.post(
  "/story/:versionId/completed",
  asyncHandler(async (req, res) => {
    // Placeholder for analytics hook
    res.json({ status: "completed", versionId: req.params.versionId });
  })
);

export default router;
