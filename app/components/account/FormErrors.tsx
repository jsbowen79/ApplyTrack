// FormErrors.tsx
export default function FormErrors() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
      <h3 className="font-heading text-sm font-semibold text-red-800 dark:text-red-300">
        Registration failed
      </h3>
      <p className="mt-1 text-sm text-red-700 dark:text-red-400">
        The information you entered has errors. Please correct them below.
      </p>
    </div>
  );
}