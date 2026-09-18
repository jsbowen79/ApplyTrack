import { Account } from "@/lib/types";

interface AccountCreatedProps {
  account: Account;
}

export default function AccountCreated({ account }: AccountCreatedProps) {
  return (
    <section>
      <h3>Registration Success</h3>
      <p>Your account has been created.</p>
      <p>Account Id: {account.id}</p>
      <p>Name: {account.name}</p>
      <p>Email: {account.email}</p>
      <p>Account Created: {account.createdAt}</p>

      <h3>We hope you enjoy our App!</h3>
    </section>
  );
}
