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
    const project = await prisma.project.update({ where: { id: req.params.id }, data: { name, description } });
    res.json(project);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
