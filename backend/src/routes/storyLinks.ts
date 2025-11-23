// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { authenticate } from "../auth.js";

const router = express.Router({ mergeParams: true });

router.use(authenticate);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const storyVersionId = req.params.versionId;
    const links = await prisma.storyLink.findMany({ where: { storyVersionId } });
    res.json(links);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { sourceNodeId, targetNodeId, label, orderIndex } = req.body;
    const storyVersionId = req.params.versionId;
    const link = await prisma.storyLink.create({ data: { storyVersionId, sourceNodeId, targetNodeId, label, orderIndex } });
    res.status(201).json(link);
  })
);

router.put(
  "/:linkId",
  asyncHandler(async (req, res) => {
    const { sourceNodeId, targetNodeId, label, orderIndex } = req.body;
    const link = await prisma.storyLink.update({ where: { id: req.params.linkId }, data: { sourceNodeId, targetNodeId, label, orderIndex } });
    res.json(link);
  })
);

router.delete(
  "/:linkId",
  asyncHandler(async (req, res) => {
    await prisma.storyLink.delete({ where: { id: req.params.linkId } });
    res.status(204).end();
  })
);

export default router;
