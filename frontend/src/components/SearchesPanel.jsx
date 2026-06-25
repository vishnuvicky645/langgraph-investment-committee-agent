import React from "react";

export default function SearchesPanel({ history, onSelectCompany }) {
  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/5 space-y-4">
      <div className="border-b border-slate-200 dark:border-white/5 pb-2">
        <h3 className="text-sm font-extrabold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          Recent Searches
        </h3>
      </div>

      {history.length === 0 ? (
        <p className="text-xs text-slate-500 font-medium text-center py-4">No recent searches yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {history.map((company, index) => {
            const firstLetter = company.charAt(0).toUpperCase();
            return (
              <div
                key={index}
                onClick={() => onSelectCompany?.(company)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/30 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 border border-slate-200 dark:border-white/5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-650 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {firstLetter}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{company}</h4>
                    <p className="text-[10px] text-slate-500">Equity Query</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-slate-500">Just Now</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
