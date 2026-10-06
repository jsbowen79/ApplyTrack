// FormErrors.tsx
export default function FormErrors() {
  return (
    <div
      role="alert"
      className="rounded-[10px_0_10px_0] border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
    >
      <p className="font-heading text-sm font-semibold text-red-800 dark:text-red-300">
        Registration failed
      </p>
      <p className="mt-1 text-sm text-red-700 dark:text-red-400">
        The information you entered has errors. Please correct them below.
      </p>
    </div>
  );
}
