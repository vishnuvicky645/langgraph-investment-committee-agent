import React from "react";

export default function SearchHero({ company, setCompany, analyzeCompany, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    analyzeCompany();
  };

  return (
    <section className="relative overflow-hidden py-10 px-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/5 bg-radial-glow glow-purple shadow-xl">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          AI Investment Committee Agent
        </h2>
        <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto font-medium">
          Automate institutional-grade equity research. Trigger a collaborative pipeline of specialized LLMs orchestrated via LangGraph.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto mt-4">
          <div className="relative flex items-center">
            {/* Search Icon */}
            <span className="absolute left-4 text-slate-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            {/* Input Field */}
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={loading}
              placeholder="Enter company name (e.g. NVIDIA, Apple, Microsoft)"
              className="w-full bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/50 focus:border-indigo-500 rounded-2xl pl-12 pr-32 py-4 text-sm font-semibold focus:outline-none transition-all duration-300 shadow-inner focus:ring-4 focus:ring-indigo-500/10 text-slate-900 dark:text-white"
            />
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !company.trim()}
              className="absolute right-2 px-6 py-2.5 rounded-xl button-gradient text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Popular:</span>
          {["Tesla", "NVIDIA", "Microsoft", "AMD"].map((name) => (
            <button
              key={name}
              onClick={() => {
                setCompany(name);
              }}
              className="text-slate-500 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150 cursor-pointer"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
