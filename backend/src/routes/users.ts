// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";
import { authenticate, requireRole } from "../auth.js";
import { Role } from "@prisma/client";

const router = express.Router();

router.use(authenticate, requireRole([Role.ADMIN]));

router.get(
  "/",
  asyncHandler(async (_, res) => {
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } });
    res.json(users);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password, name, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name, role } });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, role } = req.body;
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { name, role } });
    res.json({ id: user.id, email: user.email, role: user.role, name: user.name });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
