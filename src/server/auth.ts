import {
  type PrismaClient,
  type Session as DatabaseSession,
  type User as DatabaseUser,
} from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { type z } from "zod";
import { type loginSchema } from "../common/schema/auth";

export const makeSessionCreateOptions = () => {
  return {
    id: crypto.randomBytes(64).toString("hex"), // 128 characters
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };
};

export type Session = Pick<DatabaseSession, "id" | "expires"> & {
  user: Pick<DatabaseUser, "id" | "username">;
};

export const getServerSession = async (opts: {
  prisma: PrismaClient;
  requestSessionId: string;
}): Promise<Session | null> => {
  if (!opts.requestSessionId) {
    return null;
  }

  const session = await opts.prisma.session.findUnique({
    where: {
      id: opts.requestSessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expires < new Date()) {
    await opts.prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return {
    id: session.id,
    expires: session.expires,
    user: {
      id: session.user.id,
      username: session.user.username,
    },
  };
};

export const verifyCredentials = async (opts: {
  inputCredentials: z.infer<typeof loginSchema>;
  prisma: PrismaClient;
}) => {
  const user = await opts.prisma.user.findUnique({
    where: { username: opts.inputCredentials.username },
  });

  // Note: This short-circuit return gives information on the existance
  // of a user to an attacker because they can compare response timings.
  // (this is okay)
  if (!user) {
    return [false, null] as const;
  }

  const passwordValid = await bcrypt.compare(
    opts.inputCredentials.password,
    user.passwordHash
  );

  if (!passwordValid) {
    return [false, null] as const;
  }

  return [true, user] as const;
};
