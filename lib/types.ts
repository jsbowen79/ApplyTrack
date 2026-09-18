import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Timestamp;
}

export type NewAccount = Omit<Account, "id" | "createdAt">;
