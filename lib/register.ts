"use server";

import { Account, NewAccount } from "./types";
import { verifyValidEmail } from "./users-db";
import bcrypt from "bcryptjs";
import { createAccount } from "./users-db";
import { z } from "zod";

const RegistrationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters.")
    .max(50, "Name must not exceed 50 characters."),
  email: z.email("Please enter a valid email address").trim().toLowerCase(),
  password: z.string().min(6, "Password needs to be at least 6 characters."),
});

export async function registerAccount(
  name: string,
  email: string,
  password: string,
): Promise<
  | { fieldErrors: { name?: string[]; email?: string[]; password?: string[] } }
  | Account
  | null
> {
  const result = RegistrationFormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  if (result.success) {
    const isUsedEmail: boolean = await verifyValidEmail(result.data.email);

    if (isUsedEmail) {
      return null;
    } else {
      const hashedPassword: string = await bcrypt.hash(
        result.data.password,
        10,
      );

      const newAccount: NewAccount = {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      };
      const accountInfo: Account = await createAccount(newAccount);
      return accountInfo;
    }
  } else {
    const errorTree = z.treeifyError(result.error);
    const errors = {
      fieldErrors: {
        name: errorTree.properties?.name?.errors,
        email: errorTree.properties?.email?.errors,
        password: errorTree.properties?.password?.errors,
      },
    };
    return errors;
  }
}
