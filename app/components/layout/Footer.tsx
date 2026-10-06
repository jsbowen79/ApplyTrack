export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <p>&copy; {new Date().getFullYear()} ApplyTrack. Built for WDD 430.</p>
    </footer>
  );
}