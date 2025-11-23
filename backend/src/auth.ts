// TaleWeaver backend - AGPLv3
import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";
import { AuthenticatedRequest, AuthTokenPayload } from "./types.js";
import { NextFunction, Response } from "express";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "taleweaver-dev-secret";

export function signAccessToken(userId: string, role: Role, email: string) {
  const payload: AuthTokenPayload = { sub: userId, role, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ message: "Invalid user" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(roles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
