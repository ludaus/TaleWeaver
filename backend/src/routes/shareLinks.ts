// TaleWeaver backend - AGPLv3
import express from "express";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { prisma } from "../prisma.js";
import { authenticate } from "../auth.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { storyVersionId, type } = req.body;
    const token = crypto.randomUUID();
    const link = await prisma.storyShareLink.create({
      data: {
        storyVersionId,
        type,
        token,
        createdByUserId: req.user!.id
      }
    });
    res.status(201).json(link);
  })
);

router.get(
  "/resolve/:token",
  asyncHandler(async (req, res) => {
    const link = await prisma.storyShareLink.findUnique({ where: { token: req.params.token }, include: { storyVersion: true } });
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json(link);
  })
);

export default router;
