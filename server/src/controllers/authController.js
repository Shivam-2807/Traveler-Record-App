import bcrypt from "bcryptjs";
import { isMemoryStore } from "../config/dataStore.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { memoryDb } from "../utils/memoryDb.js";

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    verifiedStatus: user.verifiedStatus,
    subscriptionType: user.subscriptionType
  };
}

export async function register(request, response, next) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      response.status(400);
      throw new Error("Name, email, and password are required");
    }

    if (password.length < 6) {
      response.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    const existingUser = isMemoryStore()
      ? memoryDb.findUserByEmail(email)
      : await User.findOne({ email });

    if (existingUser) {
      response.status(409);
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = isMemoryStore()
      ? memoryDb.createUser({ name, email, passwordHash })
      : await User.create({ name, email, passwordHash });

    response.status(201).json({
      user: sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    const user = isMemoryStore()
      ? memoryDb.findUserByEmail(email)
      : await User.findOne({ email });

    if (!user) {
      response.status(401);
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      response.status(401);
      throw new Error("Invalid email or password");
    }

    response.json({
      user: sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
}

export function getMe(request, response) {
  response.json({ user: request.user });
}
