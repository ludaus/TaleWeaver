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
    const projectId = req.params.projectId;
    const versions = await prisma.storyVersion.findMany({ where: { projectId }, include: { baseVersion: true } });
    res.json(versions);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, description, baseVersionId } = req.body;
    const projectId = req.params.projectId;
    const version = await prisma.storyVersion.create({ data: { name, description, projectId, baseVersionId } });
    res.status(201).json(version);
  })
);

router.put(
  "/:versionId",
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const version = await prisma.storyVersion.update({ where: { id: req.params.versionId }, data: { name, description } });
    res.json(version);
  })
);

router.delete(
  "/:versionId",
  asyncHandler(async (req, res) => {
    await prisma.storyVersion.delete({ where: { id: req.params.versionId } });
    res.status(204).end();
  })
);

export default router;
