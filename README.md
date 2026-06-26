# 🏛️ AI Investment Committee Agent

A multi-agent AI-powered investment research platform built using React, Express, LangGraph, and Gemini.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

---

## 🚀 Features

* **Multi-Agent Investment Research System**: Utilizes specialized LLM nodes working collaboratively to analyze various company parameters (Research, Growth, Risk, Sentiment).
* **LangGraph State Machine Orchestration**: Handles complex workflows, structured state transitions, and node coordinates cleanly without nested callback chains.
* **Gemini API Integration**: Leverages Google's state-of-the-art `gemini-2.5-flash` model for rich financial analysis and structured decision synthesis.
* **Company Comparison Dashboard**: Side-by-side comparative views evaluating two companies' strengths, risks, growth vectors, and final ratings.
* **Search History**: A persistent sidebar tracking previous company analyses for swift reloading across sessions.
* **Confidence Meter**: Visualizes the quantitative confidence level of the final investment recommendation.
* **Dark Mode**: Supports modern dark and light mode themes built using CSS custom variables and premium radial glows.
* **Fallback Mode for API Quota Failures**: Elegant fallback error-handlers to ensure the dashboard continues functioning gracefully using local mocked components if API limits are hit.
* **Responsive FinTech Dashboard**: A fully adaptive user interface tailored after professional SaaS design systems like Vercel and Stripe.
* **Production Deployment**: Configured and optimized for hosting on high-performance cloud environments.

---

## 🛠️ Tech Stack

### Frontend
* **Framework**: React (Vite)
* **HTTP Client**: Axios
* **Styling**: Vanilla CSS (Tailwind variables, custom glassmorphism effects, radial gradients)
* **Utilities**: jsPDF (for structured corporate PDF exports)

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Orchestration**: `@langchain/langgraph` & LangChain Community packages

### AI & Orchestration
* **LLM Engine**: Google Gemini API (`gemini-2.5-flash`)
* **Orchestration framework**: LangGraph Node Workflows

### Deployment
* **Frontend Hosting**: Vercel
* **Backend Hosting**: Render

---

## 🌐 Live Demo

🔗 **Frontend (Vercel)**: [https://langgraph-investment-committee-agen.vercel.app/](https://langgraph-investment-committee-agen.vercel.app/)

🔗 **Backend (Render)**: [https://langgraph-investment-committee-agent.onrender.com](https://langgraph-investment-committee-agent.onrender.com)

---

## 📐 Architecture

Below is the conceptual flow of how the multi-agent system processes requests:

```mermaid
flowchart TD
    User([User])
    subgraph Frontend [Client - Vercel]
        Dashboard["React Dashboard UI"]
    end
    subgraph Backend [Server - Render]
        Express["Express API Server"]
        subgraph LangGraph [LangGraph Workflow State Machine]
            Research["Research Agent<br/>(Gemini API)"]
            Growth["Growth Agent<br/>(Local)"]
            Risk["Risk Agent<br/>(Local)"]
            Sentiment["Sentiment Agent<br/>(Local)"]
            Committee["Committee Agent<br/>(Gemini API)"]
            
            Research --> Growth
            Growth --> Risk
            Risk --> Sentiment
            Sentiment --> Committee
        end
    end
    
    User -->|Enters Company| Dashboard
    Dashboard -->|POST /analyze| Express
    Express -->|Triggers Graph| LangGraph
    Committee -->|Generates Recommendation| Express
    Express -->|Returns Analysis JSON| Dashboard
    Dashboard -->|Displays Result & Decision| User
```

---

## 🖼️ Screenshots

### Dashboard
![Dashboard](screenshots/Dashboard.png)

### Company Comparison
![Company Comparison](screenshots/comparison.png)

### Dark Mode
![Dark Mode](screenshots/darkmode.png)

### Architecture Diagram
![Architecture Diagram](screenshots/architecture.png)

### Deployment Screenshot
*(Note: Refer to Vercel/Render Live links above for the fully deployed application status)*

---

## ☁️ Deployment Note

> [!IMPORTANT]
> The backend server is hosted on Render's **Free Tier**. As a result, the server will go to sleep after periods of inactivity. If you are accessing the demo for the first time in a while, please allow **30–60 seconds** for the backend instance to spin up.

---

## 🔮 Future Improvements

* **Real-time stock APIs**: Integration with live equity data providers (e.g. Yahoo Finance, Alpha Vantage) for actual ticker prices and real-time updates.
* **Authentication System**: Secure user registration and login portals using JWT or Firebase Auth to manage personal portfolios.
* **Portfolio Tracking**: Real-time asset tracker visualizing gain/loss charts and transaction history.
* **Watchlist**: Advanced watchlist metrics with dynamic triggers and alert configurations.
* **Email Reports**: Daily or weekly automated investment report delivery to registered emails.
* **Historical Stock Analytics**: Interactive charts showcasing historical performance metrics using Chart.js or Recharts.

---

## ✍️ Author

**Vishnu V**

* 🎓 BTech CSE (AI & ML) — **Lovely Professional University**
* 🐙 GitHub: [@vishnuvicky645](https://github.com/vishnuvicky645)
* 💼 LinkedIn: [linkedin.com/in/VishnuVardhanReddyMunagala](https://www.linkedin.com/in/vishnu-vardhan-reddy-munagala21)
