import React, { useState } from "react";

export default function DetailedAnalysis({ data }) {
  if (!data) return null;

  const [expandedCard, setExpandedCard] = useState(null);

  const agents = [
    {
      id: "research",
      title: "Research Agent",
      subtitle: "Industry & Core Business Model Analysis",
      content: data.research,
      icon: "🔍",
      gradient: "from-purple-500/10 to-indigo-500/10",
      border: "hover:border-purple-500/30",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: "growth",
      title: "Growth Agent",
      subtitle: "Future Opportunities & Market Scaling Estimation",
      content: data.growth,
      icon: "📈",
      gradient: "from-blue-500/10 to-indigo-500/10",
      border: "hover:border-blue-500/30",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "risk",
      title: "Risk Agent",
      subtitle: "Regulatory, Competitive & Structural Risk Scan",
      content: data.risk,
      icon: "⚠️",
      gradient: "from-amber-500/10 to-orange-500/10",
      border: "hover:border-amber-500/30",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "sentiment",
      title: "Sentiment Agent",
      subtitle: "Retail Trends, News cycles & Consensus Index",
      content: data.sentiment,
      icon: "💬",
      gradient: "from-cyan-500/10 to-blue-500/10",
      border: "hover:border-cyan-500/30",
      textColor: "text-cyan-600 dark:text-cyan-400"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/5 pb-2">
        <h3 className="text-sm font-extrabold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          Detailed Agent Assessments
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const isExpanded = expandedCard === agent.id;
          return (
            <div
              key={agent.id}
              className={`p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/5 bg-gradient-to-br ${agent.gradient} ${agent.border} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center text-lg border border-slate-200 dark:border-white/5">
                    {agent.icon}
                  </span>
                  <div>
                    <h4 className={`text-base font-bold ${agent.textColor}`}>{agent.title}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{agent.subtitle}</p>
                  </div>
                </div>

                <div className={`text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[800px]" : "max-h-24 mask-gradient"
                }`}>
                  <p className="whitespace-pre-line">{agent.content}</p>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(agent.id)}
                className={`mt-4 w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700/50 hover:border-slate-500 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200`}
              >
                {isExpanded ? (
                  <>
                    <span>Hide Details</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
