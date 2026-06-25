import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Summary Skeleton */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Circular progress dummy */}
          <div className="relative w-36 h-36 rounded-full border-4 border-slate-800/80 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-slate-800/50 animate-shimmer" />
          </div>
          {/* Text lines */}
          <div className="flex-1 space-y-4 w-full">
            <div className="h-6 w-1/3 bg-slate-800/80 rounded animate-shimmer" />
            <div className="h-10 w-1/4 bg-slate-800/50 rounded animate-shimmer" />
            <div className="h-4 w-3/4 bg-slate-800/40 rounded animate-shimmer" />
          </div>
        </div>
        {/* Metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/50">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-900/40 rounded-xl p-4 border border-white/5 space-y-2">
              <div className="h-3 w-1/2 bg-slate-800/60 rounded" />
              <div className="h-5 w-3/4 bg-slate-800/40 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Agents grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex-shrink-0" />
              <div className="space-y-2 w-full">
                <div className="h-4 w-1/3 bg-slate-800/80 rounded" />
                <div className="h-3 w-1/4 bg-slate-800/40 rounded" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-slate-800/50 rounded" />
              <div className="h-3 w-5/6 bg-slate-800/50 rounded" />
              <div className="h-3 w-4/5 bg-slate-800/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
