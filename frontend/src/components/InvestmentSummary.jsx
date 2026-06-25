import React from "react";

export default function InvestmentSummary({ data, downloadPDF }) {
  if (!data) return null;

  const { finalDecision, company } = data;
  const decision = finalDecision?.decision || "PASS";
  const confidence = finalDecision?.confidence || 50;
  const reasoning = finalDecision?.reasoning || "";
  const explanation = finalDecision?.simpleExplanation || "";

  // Circle meter settings
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getGrowthRating = () => {
    if (data.growth?.toLowerCase().includes("invest") || data.growth?.toLowerCase().includes("strong")) return "High Growth";
    return "Moderate Scale";
  };

  const getRiskRating = () => {
    if (data.risk?.toLowerCase().includes("pass") || data.risk?.toLowerCase().includes("high")) return "Moderate-High";
    return "Low Risk Factor";
  };

  const getSentimentRating = () => {
    if (data.sentiment?.toLowerCase().includes("invest") || data.sentiment?.toLowerCase().includes("positive")) return "Bullish Outl.";
    return "Neutral Market";
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Investment Summary</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Final analysis debate result for {company}</p>
        </div>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all duration-200 hover:scale-102"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Report
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* SVG Circular Confidence Meter */}
        <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-slate-200 dark:text-slate-800/80"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className={`${decision === "INVEST" ? "text-emerald-500" : "text-rose-500"}`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
            />
          </svg>
          {/* Inner text content */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{confidence}%</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Confidence</span>
          </div>
        </div>

        {/* Decision details */}
        <div className="flex-1 space-y-4 text-center md:text-left w-full">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-extrabold block mb-1">Committee Decision</span>
            <span className={`inline-flex px-6 py-2 rounded-2xl text-sm font-extrabold tracking-widest uppercase shadow-md ${
              decision === "INVEST"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20"
            }`}>
              {decision}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              <strong>Reasoning:</strong> {reasoning}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-normal">
              <strong>Summary:</strong> {explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Mini Statistics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/40">
        <div className="bg-slate-100 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-250 dark:border-white/5 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Growth Rating</span>
          <span className="text-xs font-extrabold text-purple-650 dark:text-purple-400 block">{getGrowthRating()}</span>
        </div>
        <div className="bg-slate-100 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-250 dark:border-white/5 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Risk Profile</span>
          <span className="text-xs font-extrabold text-amber-650 dark:text-amber-550 block">{getRiskRating()}</span>
        </div>
        <div className="bg-slate-100 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-250 dark:border-white/5 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Sentiment Index</span>
          <span className="text-xs font-extrabold text-cyan-650 dark:text-cyan-400 block">{getSentimentRating()}</span>
        </div>
        <div className="bg-slate-100 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-250 dark:border-white/5 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Financial Health</span>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-450 block">✓ Healthy</span>
        </div>
      </div>
    </div>
  );
}
