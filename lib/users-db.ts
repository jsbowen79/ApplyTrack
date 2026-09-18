import { neon } from "@neondatabase/serverless";
import { Account, NewAccount } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

export async function verifyValidEmail(email: string): Promise<string[]> {
  const rows: Record<string, string>[] = await sql`
    SELECT email FROM users WHERE email = ${email}`;
  const emails: string[] = rows.map((e) => {
    return e.email;
  });

  return emails;
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
