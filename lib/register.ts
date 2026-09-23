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
  console.log("Checking zod");
  const result = RegistrationFormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  console.log("Result.success: ", result.success);

  if (result.success) {
    console.log("Result.data", result.data);
    const isUsedEmail: boolean = await verifyValidEmail(result.data.email);

    console.log("isUsedEmail: ", isUsedEmail);
    if (isUsedEmail) {
      return null;
    } else {
      console.log("not used email. ");
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
    console.log("ErrorTree: ", errorTree);
    console.log("Errors: ", errors);
    return errors;
  }
}
