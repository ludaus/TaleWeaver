// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { authenticate } from "../auth.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await prisma.project.findMany({
      where: { OR: [{ ownerId: req.user!.id }, { members: { some: { id: req.user!.id } } }] },
      include: { owner: true }
    });
    res.json(projects);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const project = await prisma.project.create({ data: { name, description, ownerId: req.user!.id, members: { connect: { id: req.user!.id } } } });
    res.status(201).json(project);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { members: { select: { id: true } } }
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const isOwner = project.ownerId === req.user!.id;
    const isMember = project.members.some((member) => member.id === req.user!.id);

    if (!isOwner && !isMember) return res.status(403).json({ message: "Forbidden" });

    const updatedProject = await prisma.project.update({ where: { id: req.params.id }, data: { name, description } });
    res.json(updatedProject);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { members: { select: { id: true } } }
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const isOwner = project.ownerId === req.user!.id;
    const isMember = project.members.some((member) => member.id === req.user!.id);

    if (!isOwner && !isMember) return res.status(403).json({ message: "Forbidden" });

    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
