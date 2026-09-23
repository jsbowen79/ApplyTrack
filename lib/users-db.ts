import { neon } from "@neondatabase/serverless";
import { Account, NewAccount } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

export async function verifyValidEmail(email: string): Promise<boolean> {
  console.log("in verifyValidEmail");
  const rows: Record<string, string>[] = await sql`
    SELECT email FROM users WHERE email = ${email}`;
  const emails: string[] = rows.map((e) => {
    return e.email;
  });
  console.log("Emails: ", emails);
  if (emails.length === 1) {
    return true;
  } else {
    return false;
  }
}

export async function getUserByEmail(email: string): Promise<Account | null> {
  const response = await sql`
  SELECT *
   FROM users WHERE email = ${email}`;

  if (!response[0]) {
    return null;
  } else {
    const account: Account = response[0] as Account;
    return account;
  }
}

export async function createAccount(account: NewAccount): Promise<Account> {
  const rows = await sql`
    INSERT INTO users
    (name,
    email,
    password)
    VALUES (${account.name}, ${account.email}, ${account.password})
    RETURNING
    id,
    name,
    email,
    password,
    createdAt`;

  return rows[0] as Account;
}
