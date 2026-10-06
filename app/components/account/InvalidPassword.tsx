// InvalidPassword.tsx
export default function InvalidPassword() {
  return (
    <div
      role="alert"
      className="rounded-[10px_0_10px_0] border border-red-900 bg-red-50 p-4 dark:border-red-300 dark:bg-red-950"
    >
      <p className="font-heading text-sm font-semibold text-red-900 dark:text-red-300">
        Registration failed
      </p>
      <p className="mt-1 text-sm text-red-900 dark:text-red-300">
        Your passwords didn&apos;t match. Please try again.
      </p>
    </div>
  );
}