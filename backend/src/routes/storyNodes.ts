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
    const nodes = await prisma.storyNode.findMany({ where: { storyVersionId }, include: { outgoingLinks: true } });
    res.json(nodes);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, nodeType, positionX, positionY, textBlocks, backgroundMediaId, backgroundAudioMediaId, musicAudioMediaId, voiceOverAudioMediaId } = req.body;
    const storyVersionId = req.params.versionId;
    const node = await prisma.storyNode.create({
      data: {
        storyVersionId,
        title,
        nodeType,
        positionX,
        positionY,
        textBlocks,
        backgroundMediaId,
        backgroundAudioMediaId,
        musicAudioMediaId,
        voiceOverAudioMediaId
      }
    });
    res.status(201).json(node);
  })
);

router.put(
  "/:nodeId",
  asyncHandler(async (req, res) => {
    const { title, nodeType, positionX, positionY, textBlocks, backgroundMediaId, backgroundAudioMediaId, musicAudioMediaId, voiceOverAudioMediaId } = req.body;
    const node = await prisma.storyNode.update({
      where: { id: req.params.nodeId },
      data: { title, nodeType, positionX, positionY, textBlocks, backgroundMediaId, backgroundAudioMediaId, musicAudioMediaId, voiceOverAudioMediaId }
    });
    res.json(node);
  })
);

router.delete(
  "/:nodeId",
  asyncHandler(async (req, res) => {
    await prisma.storyNode.delete({ where: { id: req.params.nodeId } });
    res.status(204).end();
  })
);

export default router;
