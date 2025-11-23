// TaleWeaver backend - AGPLv3
import { Role, User } from "@prisma/client";
import { Request } from "express";

export interface AuthTokenPayload {
  sub: string;
  role: Role;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
