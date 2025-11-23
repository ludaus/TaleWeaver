// TaleWeaver backend - AGPLv3
import express from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { signAccessToken } from "../auth.js";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name, role: Role.AUTHOR } });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, token: signAccessToken(user.id, user.role, user.email) });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, token: signAccessToken(user.id, user.role, user.email) });
  })
);

export default router;
