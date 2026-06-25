import React from "react";

export default function CompanyComparison({
  companyA,
  setCompanyA,
  companyB,
  setCompanyB,
  compareCompanies,
  compareData,
  compareLoading,
  getConfidenceStyles
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyA.trim() || !companyB.trim()) return;
    compareCompanies();
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
      <div className="border-b border-slate-200 dark:border-white/5 pb-2">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Compare Companies</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Conduct a side-by-side multi-agent evaluation debate comparison</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full flex items-center gap-3">
          <input
            type="text"
            placeholder="Company A (e.g. NVIDIA)"
            value={companyA}
            onChange={(e) => setCompanyA(e.target.value)}
            disabled={compareLoading}
            className="w-full bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/50 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all duration-300 text-slate-900 dark:text-white"
          />
          <span className="text-sm font-extrabold text-slate-500">VS</span>
          <input
            type="text"
            placeholder="Company B (e.g. AMD)"
            value={companyB}
            onChange={(e) => setCompanyB(e.target.value)}
            disabled={compareLoading}
            className="w-full bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/50 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all duration-300 text-slate-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={compareLoading || !companyA.trim() || !companyB.trim()}
          className="w-full sm:w-auto px-8 py-3 rounded-2xl button-gradient text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 cursor-pointer flex-shrink-0"
        >
          {compareLoading ? "Comparing..." : "Compare"}
        </button>
      </form>

      {compareLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
      )}

      {compareData && !compareLoading && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/5">
                  <th className="px-6 py-4 font-extrabold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400">Category</th>
                  <th className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{companyA}</th>
                  <th className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{companyB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {/* Decision row */}
                <tr>
                  <td className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Decision</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      compareData.company1.finalDecision.decision === "INVEST"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    }`}>
                      {compareData.company1.finalDecision.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      compareData.company2.finalDecision.decision === "INVEST"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    }`}>
                      {compareData.company2.finalDecision.decision}
                    </span>
                  </td>
                </tr>

                {/* Confidence row */}
                <tr>
                  <td className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Confidence</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                      style={getConfidenceStyles(compareData.company1.finalDecision.confidence, compareData.company2.finalDecision.confidence)}
                    >
                      {compareData.company1.finalDecision.confidence}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                      style={getConfidenceStyles(compareData.company2.finalDecision.confidence, compareData.company1.finalDecision.confidence)}
                    >
                      {compareData.company2.finalDecision.confidence}%
                    </span>
                  </td>
                </tr>

                {/* Growth row */}
                <tr>
                  <td className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Growth Analysis</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company1.growth}</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company2.growth}</td>
                </tr>

                {/* Risk row */}
                <tr>
                  <td className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Risk Scan</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company1.risk}</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company2.risk}</td>
                </tr>

                {/* Sentiment row */}
                <tr>
                  <td className="px-6 py-4 font-extrabold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Sentiment consensus</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company1.sentiment}</td>
                  <td className="px-6 py-4 text-xs font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">{compareData.company2.sentiment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
