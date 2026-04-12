import jwt from "jsonwebtoken";
import { isMemoryStore } from "../config/dataStore.js";
import User from "../models/User.js";
import { memoryDb } from "../utils/memoryDb.js";

export async function protect(request, response, next) {
  try {
    const header = request.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      response.status(401);
      throw new Error("Not authorized, token missing");
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = isMemoryStore()
      ? memoryDb.findUserById(decoded.userId)
      : await User.findById(decoded.userId).select("-passwordHash");

    if (!user) {
      response.status(401);
      throw new Error("Not authorized, user not found");
    }

    if (isMemoryStore()) {
      const { passwordHash, ...safeUser } = user;
      request.user = safeUser;
    } else {
      request.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
}
