// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { authenticate } from "../auth.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/node/:nodeId",
  asyncHandler(async (req, res) => {
    const comments = await prisma.reviewerComment.findMany({ where: { storyNodeId: req.params.nodeId }, orderBy: { createdAt: "desc" } });
    res.json(comments);
  })
);

router.post(
  "/node/:nodeId",
  asyncHandler(async (req, res) => {
    const { reviewerName, text } = req.body;
    const comment = await prisma.reviewerComment.create({ data: { storyNodeId: req.params.nodeId, reviewerName, text, userId: req.user!.id } });
    res.status(201).json(comment);
  })
);

router.delete(
  "/:commentId",
  asyncHandler(async (req, res) => {
    await prisma.reviewerComment.delete({ where: { id: req.params.commentId } });
    res.status(204).end();
  })
);

export default router;
