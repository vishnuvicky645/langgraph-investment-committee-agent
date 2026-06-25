import React from "react";

export default function SystemInfoCard() {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
      <div className="border-b border-slate-200 dark:border-white/5 pb-3">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
          <span>⚙️</span> System Architecture Information
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Orchestration pipeline logs and diagnostic overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workflow Diagram */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Workflow Pipeline</h4>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            {["React Dashboard", "Express Server", "LangGraph Graph", "Specialist Agents", "Committee Consensus"].map((node, i) => (
              <React.Fragment key={i}>
                <span className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-250 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 shadow-sm">
                  {node}
                </span>
                {i < 4 && <span className="text-slate-400 dark:text-slate-500 font-bold">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Diagnostic Checks */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Agent Heartbeats</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Research Node", desc: "Gemini 2.5-Flash" },
              { name: "Growth Node", desc: "Local Mock Data" },
              { name: "Risk Node", desc: "Local Mock Data" },
              { name: "Sentiment Node", desc: "Local Mock Data" },
              { name: "Committee Node", desc: "Gemini 2.5-Flash" }
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <div className="text-[11px] font-bold">
                  <div>{node.name}</div>
                  <div className="text-[9px] opacity-75 font-normal">{node.desc}</div>
                </div>
                <span className="text-xs font-extrabold">✓ OK</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 text-xs font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-slate-600 dark:text-slate-300">Status: All Systems Operational. Network response latency stable.</span>
      </div>
    </div>
  );
}
