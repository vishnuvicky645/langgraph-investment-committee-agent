import React from "react";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-white/5 bg-slate-900/10 dark:bg-slate-900/10 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace</h2>
        <span className="text-slate-600">/</span>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </span>
          🏷️ Powered by LangGraph + Gemini
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200 cursor-pointer border border-transparent dark:border-white/5"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-3.364l-.707.707M6.343 17.657l-.707.707m2.828 9.9a5 5 0 117.072 0l-.548 1.097A1.5 1.5 0 0113.62 21h-3.24a1.5 1.5 0 01-1.284-.858l-.548-1.097z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-700/30 pl-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-md shadow-indigo-500/10 cursor-pointer">
            VI
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Vishnu V</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Intern Portfolio</p>
          </div>
        </div>
      </div>
    </header>
  );
}
