import React from "react";

export default function WorkflowPipeline({ activeNode, loading }) {
  const steps = [
    {
      id: "research",
      label: "Research Agent",
      desc: "Analyzes industry, product model, and overview",
      icon: "🔍",
      borderColor: "border-purple-500/20 dark:border-purple-500/30",
      accentBg: "bg-purple-500/10",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: "growth",
      label: "Growth Agent",
      desc: "Evaluates scale, expansion, and opportunities",
      icon: "📈",
      borderColor: "border-blue-500/20 dark:border-blue-500/30",
      accentBg: "bg-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "risk",
      label: "Risk Agent",
      desc: "Assesses competitor threats and volatility",
      icon: "⚠️",
      borderColor: "border-amber-500/20 dark:border-amber-500/30",
      accentBg: "bg-amber-500/10",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "sentiment",
      label: "Sentiment Agent",
      desc: "Scans public perception and analyst views",
      icon: "💬",
      borderColor: "border-cyan-500/20 dark:border-cyan-500/30",
      accentBg: "bg-cyan-500/10",
      textColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      id: "committee",
      label: "Committee Agent",
      desc: "Weighs inputs and returns final decision",
      icon: "🏛️",
      borderColor: "border-emerald-500/20 dark:border-emerald-500/30",
      accentBg: "bg-emerald-500/10",
      textColor: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-extrabold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
        AI Agent Workflow Pipeline
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, idx) => {
          const isDone = !loading;
          return (
            <div
              key={step.id}
              className={`relative p-5 rounded-2xl glass-panel border transition-all duration-300 ${step.borderColor} hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-8 h-8 rounded-xl ${step.accentBg} flex items-center justify-center text-sm`}>
                  {step.icon}
                </span>
                {isDone ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-600 dark:text-emerald-500 font-extrabold">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 animate-pulse" />
                )}
              </div>
              <h4 className={`text-sm font-bold ${step.textColor}`}>{step.label}</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug font-semibold">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
