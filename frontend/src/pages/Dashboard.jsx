import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchHero from "../components/SearchHero";
import WorkflowPipeline from "../components/WorkflowPipeline";
import InvestmentSummary from "../components/InvestmentSummary";
import DetailedAnalysis from "../components/DetailedAnalysis";
import SearchesPanel from "../components/SearchesPanel";
import SystemInfoCard from "../components/SystemInfoCard";
import CompanyComparison from "../components/CompanyComparison";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Dashboard() {
  const [view, setView] = useState("dashboard");
  const [company, setCompany] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [companyA, setCompanyA] = useState("");
  const [companyB, setCompanyB] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || true; // dark by default
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const analyzeCompany = async (targetCompany) => {
    const searchTarget = targetCompany || company;
    if (!searchTarget.trim()) return;

    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API}/analyze`,
        {
          company: searchTarget
        }
      );

      setData(response.data);
      setHistory((prev) =>
        prev.includes(searchTarget) ? prev : [...prev, searchTarget]
      );
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const compareCompanies = async () => {
    if (!companyA || !companyB) {
      alert("Please enter two companies to compare");
      return;
    }
    try {
      setCompareLoading(true);
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API}/compare`,
        {
          company1: companyA,
          company2: companyB
        }
      );
      setCompareData(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred."
      );
    } finally {
      setCompareLoading(false);
    }
  };

  const getConfidenceStyles = (confSelf, confOther) => {
    if (confSelf > confOther) {
      return { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" };
    } else if (confSelf < confOther) {
      return { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" };
    }
    return { backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)" };
  };

  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const companyName = data.company || company;
    const primaryColor = [79, 70, 229]; // Indigo
    const textColor = [15, 23, 42]; // Dark Slate
    const secondaryTextColor = [100, 116, 139]; // Slate Gray
    const lightBgColor = [248, 250, 252]; // Light Slate
    const marginX = 20;
    let posY = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (marginX * 2);

    const checkPageOverflow = (neededHeight) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      if (posY + neededHeight > pageHeight - 20) {
        doc.addPage();
        posY = 20;
        return true;
      }
      return false;
    };

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(marginX, posY, contentWidth, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("AI INVESTMENT COMMITTEE REPORT", marginX + 8, posY + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, marginX + 8, posY + 22);

    posY += 40;

    // Company Title
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(companyName.toUpperCase(), marginX, posY);
    posY += 10;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(marginX, posY, marginX + contentWidth, posY);
    posY += 10;

    const writeSection = (title, text) => {
      checkPageOverflow(30);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title, marginX, posY);
      posY += 6;

      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const splitText = doc.splitTextToSize(text, contentWidth);
      const textHeight = splitText.length * 5;

      checkPageOverflow(textHeight + 10);
      doc.text(splitText, marginX, posY);
      posY += textHeight + 12;
    };

    writeSection("1. Research Analysis", data.research);
    writeSection("2. Growth Analysis", data.growth);
    writeSection("3. Risk Analysis", data.risk);
    writeSection("4. Sentiment Analysis", data.sentiment);

    // Debate Section
    checkPageOverflow(40);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("5. Investment Committee Debate", marginX, posY);
    posY += 8;

    const debateItems = [
      { agent: "Research Agent", decision: "INVEST", reason: `Strong industry fundamentals and solid business model for ${companyName}.` },
      { agent: "Growth Agent", decision: "INVEST", reason: "High potential for market expansion and revenue growth." },
      { agent: "Risk Agent", decision: "PASS", reason: "Increased competition and potential market headwinds." },
      { agent: "Sentiment Agent", decision: "INVEST", reason: "Positive market perception and strong customer reviews." }
    ];

    doc.setFontSize(10);
    debateItems.forEach((item) => {
      checkPageOverflow(12);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "bold");
      doc.text(`${item.agent}: `, marginX, posY);

      const agentWidth = doc.getTextWidth(`${item.agent}: `);
      if (item.decision === "INVEST") {
        doc.setTextColor(6, 95, 70);
      } else {
        doc.setTextColor(153, 27, 27);
      }
      doc.text(item.decision, marginX + agentWidth, posY);

      const decisionWidth = doc.getTextWidth(item.decision);
      doc.setTextColor(...secondaryTextColor);
      doc.setFont("helvetica", "normal");

      const reasonText = ` - ${item.reason}`;
      const splitReason = doc.splitTextToSize(reasonText, contentWidth - agentWidth - decisionWidth - 5);
      doc.text(splitReason, marginX + agentWidth + decisionWidth, posY);
      posY += (splitReason.length * 5) + 3;
    });

    posY += 8;

    // Final Decision
    checkPageOverflow(35);
    doc.setFillColor(...lightBgColor);
    doc.rect(marginX, posY, contentWidth, 30, "F");

    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("6. Final Committee Decision", marginX + 6, posY + 8);

    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Decision: `, marginX + 6, posY + 16);

    const isInvest = data.finalDecision.decision === "INVEST";
    if (isInvest) {
      doc.setTextColor(6, 95, 70);
    } else {
      doc.setTextColor(153, 27, 27);
    }
    doc.setFont("helvetica", "bold");
    doc.text(data.finalDecision.decision, marginX + 24, posY + 16);

    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    doc.text(`Confidence: `, marginX + 6, posY + 23);

    doc.setFont("helvetica", "bold");
    doc.text(`${data.finalDecision.confidence}%`, marginX + 28, posY + 23);

    doc.save(`${companyName}-Investment-Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-955 bg-radial-glow flex transition-all duration-300">
      {/* Sidebar navigation */}
      <Sidebar
        setView={setView}
        activeView={view}
        searches={history}
        handleAnalyze={(c) => {
          setCompany(c);
          analyzeCompany(c);
          setView("dashboard");
        }}
      />

      {/* Main content frame */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
          {view === "dashboard" && (
            <>
              {/* Main search card */}
              <SearchHero
                company={company}
                setCompany={setCompany}
                analyzeCompany={() => analyzeCompany()}
                loading={loading}
              />

              {/* Workflow Pipeline */}
              <WorkflowPipeline loading={loading} />
            </>
          )}

          {/* Core content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {view === "dashboard" && (
                <>
                  {loading ? (
                    <LoadingSkeleton />
                  ) : data ? (
                    <>
                      <InvestmentSummary data={data} downloadPDF={downloadPDF} />
                      <DetailedAnalysis data={data} />
                    </>
                  ) : (
                    <div className="glass-panel rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-700/50">
                      <span className="text-4xl">📊</span>
                      <h3 className="text-lg font-bold text-slate-400 mt-4">No Analysis Loaded</h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2">
                        Enter a company name in the search bar above to trigger the multi-agent graph simulation.
                      </p>
                    </div>
                  )}
                </>
              )}

              {view === "compare" && (
                <CompanyComparison
                  companyA={companyA}
                  setCompanyA={setCompanyA}
                  companyB={companyB}
                  setCompanyB={setCompanyB}
                  compareCompanies={compareCompanies}
                  compareData={compareData}
                  compareLoading={compareLoading}
                  getConfidenceStyles={getConfidenceStyles}
                />
              )}

              {view === "history" && (
                <SearchesPanel
                  history={history}
                  onSelectCompany={(c) => {
                    setCompany(c);
                    analyzeCompany(c);
                    setView("dashboard");
                  }}
                />
              )}

              {view === "watchlist" && (
                <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
                  <div className="border-b border-slate-200 dark:border-white/5 pb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Watchlist</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Track and re-analyze key public companies in your portfolio</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { symbol: "NVDA", name: "NVIDIA Corp.", price: "$127.40", change: "+4.2%", trend: "up", decision: "INVEST" },
                      { symbol: "AAPL", name: "Apple Inc.", price: "$214.30", change: "-0.8%", trend: "down", decision: "INVEST" },
                      { symbol: "MSFT", name: "Microsoft Corp.", price: "$415.60", change: "+1.5%", trend: "up", decision: "INVEST" },
                      { symbol: "AMD", name: "Advanced Micro Devices", price: "$158.20", change: "-2.4%", trend: "down", decision: "PASS" }
                    ].map((stock) => (
                      <div key={stock.symbol} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-extrabold text-slate-600 dark:text-slate-350">{stock.symbol}</span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{stock.name}</h4>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Price: <span className="font-bold text-slate-800 dark:text-slate-200">{stock.price}</span> ({stock.change})</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${stock.decision === "INVEST" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20"
                            }`}>{stock.decision}</span>
                          <button
                            onClick={() => {
                              setCompany(stock.symbol);
                              analyzeCompany(stock.symbol);
                              setView("dashboard");
                            }}
                            className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                          >
                            Re-Analyze
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "reports" && (
                <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
                  <div className="border-b border-slate-200 dark:border-white/5 pb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Generated Reports</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Download structured PDF research documents compiled by the committee</p>
                  </div>
                  {data ? (
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{data.company} Research Report</h4>
                          <p className="text-xs text-slate-500">PDF Document • Ready</p>
                        </div>
                      </div>
                      <button
                        onClick={downloadPDF}
                        className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold cursor-pointer shadow-md transition-colors"
                      >
                        Download PDF
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-8 font-semibold">No reports generated yet. Analyze a company first.</p>
                  )}
                </div>
              )}

              {view === "settings" && (
                <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 bg-radial-glow shadow-xl space-y-6">
                  <div className="border-b border-slate-200 dark:border-white/5 pb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Settings</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Configure multi-agent model weighting and credentials</p>
                  </div>
                  <div className="space-y-4 max-w-md text-sm font-semibold">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">API Model Endpoint</label>
                      <select className="w-full bg-white dark:bg-slate-900/65 border border-slate-350 dark:border-slate-700/50 rounded-2xl px-4 py-3 focus:outline-none transition-all duration-300 text-slate-900 dark:text-white">
                        <option>gemini-2.5-flash (Default)</option>
                        <option>gemini-1.5-pro</option>
                        <option>gemini-1.5-flash</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">API Authentication Key</label>
                      <input
                        type="password"
                        value="••••••••••••••••••••••••"
                        disabled
                        className="w-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3 text-slate-500"
                      />
                      <p className="text-[10px] text-slate-500 font-medium mt-1">Configured securely in backend `.env` variables.</p>
                    </div>
                    <div className="space-y-2 pt-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1">Committee Weights</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">Research (25%)</span>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">Growth (25%)</span>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">Risk (25%)</span>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">Sentiment (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar list items */}
            <div className="space-y-8">
              {view !== "history" && (
                <SearchesPanel
                  history={history}
                  onSelectCompany={(c) => {
                    setCompany(c);
                    analyzeCompany(c);
                    setView("dashboard");
                  }}
                />
              )}
              <SystemInfoCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
