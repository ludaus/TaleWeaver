// TaleWeaver backend - AGPLv3
import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
import path from "path";
import fs from "fs";
import { prisma } from "../prisma.js";
import { authenticate } from "../auth.js";
import { MediaType } from "@prisma/client";

const upload = multer({ dest: path.join("..", "media") });
const router = express.Router();

router.use(authenticate);

router.post(
  "/global",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const { type } = req.body;
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    const media = await prisma.globalMedia.create({
      data: {
        ownerId: req.user!.id,
        type: type as MediaType,
        filePath: req.file.path,
        originalFilename: req.file.originalname,
        mimeType: req.file.mimetype,
        metadata: {}
      }
    });
    res.status(201).json(media);
  })
);

router.post(
  "/project/:projectId",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const { type } = req.body;
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    const media = await prisma.projectMedia.create({
      data: {
        projectId: req.params.projectId,
        type: type as MediaType,
        filePath: req.file.path,
        originalFilename: req.file.originalname,
        mimeType: req.file.mimetype,
        metadata: {}
      }
    });
    res.status(201).json(media);
  })
);

router.get(
  "/global",
  asyncHandler(async (req, res) => {
    const items = await prisma.globalMedia.findMany({ where: { ownerId: req.user!.id } });
    res.json(items);
  })
);

router.get(
  "/project/:projectId",
  asyncHandler(async (req, res) => {
    const items = await prisma.projectMedia.findMany({ where: { projectId: req.params.projectId } });
    res.json(items);
  })
);

router.get(
  "/file/:filename",
  asyncHandler(async (req, res) => {
    const filePath = path.join("..", "media", req.params.filename);
    if (!fs.existsSync(filePath)) return res.status(404).end();
    res.sendFile(path.resolve(filePath));
  })
);

export default router;
