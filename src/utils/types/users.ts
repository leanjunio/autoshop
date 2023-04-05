import { User } from "@prisma/client";

export type BasicUser = Pick<User, "name" | "phone_number" | "email" | "id" | "status">;