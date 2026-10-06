export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <p>&copy; {new Date().getFullYear()} ApplyTrack. Built for WDD 430.</p>
    </footer>
  );
}
