"use server";

import { Account, NewAccount } from "./types";
import { verifyValidEmail } from "./users-db";
import bcrypt from "bcryptjs";
import { createAccount } from "./users-db";

export async function registerAccount(
  name: string,
  email: string,
  password: string,
): Promise<Account | null> {
  const response = await verifyValidEmail(email);
  const isUsedEmail: string | undefined = response[0];

  if (isUsedEmail) {
    return null;
  } else {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newAccount: NewAccount = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const accountInfo: Account = await createAccount(newAccount);
    return accountInfo;
  }
}
