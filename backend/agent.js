// backend/agent.js
// This file contains all our LangGraph agents and logic.
const { StateGraph, START, END, Annotation } = require("@langchain/langgraph");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// Define the State of our Graph
// This object will be passed between our agents. First the company name is set.
// Then each agent fills in their respective fields.
const GraphState = Annotation.Root({
  company: Annotation(),
  overview: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  }),
  growth: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  }),
  risk: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  }),
  sentiment: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  }),
  decision: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  }),
  confidence: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => 0
  }),
  reasoning: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ""
  })
});

// Helper function to get an instance of Google Gemini model
function getModel() {
  // We use gemini-1.5-flash as it is fast and efficient.
  return new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    temperature: 0.2, // Low temperature for more factual responses
  });
}

// 1. Research Agent
// Gathers overview, products, services, and industry info
async function researchNode(state) {
  console.log("-> Running Research Agent");
  const model = getModel();
  const prompt = `You are a Research Agent. Provide a concise company overview, main products and services, and industry information for ${state.company}. Do not use formatting like markdown asterisks, just plain simple text.`;
  const response = await model.invoke(prompt);
  return { overview: response.content };
}

// 2. Growth Agent
// Evaluates future opportunities, growth potential, and market trends
async function growthNode(state) {
  console.log("-> Running Growth Agent");
  const model = getModel();
  const prompt = `You are a Growth Agent. Provide a concise analysis of future opportunities, growth potential, and market trends for ${state.company}. Keep it plain text.`;
  const response = await model.invoke(prompt);
  return { growth: response.content };
}

// 3. Risk Agent
// Identifies risks, competition, and challenges
async function riskNode(state) {
  console.log("-> Running Risk Agent");
  const model = getModel();
  const prompt = `You are a Risk Agent. Outline the main risks, key competitors, and challenges for ${state.company}. Keep it plain text.`;
  const response = await model.invoke(prompt);
  return { risk: response.content };
}

// 4. Sentiment Agent
// Evaluates news sentiment, public perception, and industry sentiment
async function sentimentNode(state) {
  console.log("-> Running Sentiment Agent");
  const model = getModel();
  const prompt = `You are a Sentiment Agent. Provide a quick summary of the current public perception, news sentiment, and industry sentiment surrounding ${state.company}. Keep it plain text.`;
  const response = await model.invoke(prompt);
  return { sentiment: response.content };
}

// 5. Investment Committee Agent
// Reads outputs from all agents and makes a final recommendation
async function committeeNode(state) {
  console.log("-> Running Investment Committee Agent");
  const model = getModel();
  
  const prompt = `You are the Investment Committee Agent. 
  You must read the following reports about ${state.company}:
  - Research: ${state.overview}
  - Growth: ${state.growth}
  - Risk: ${state.risk}
  - Sentiment: ${state.sentiment}

  Based on the above, provide a final recommendation in strictly valid JSON format exactly like this:
  {
    "decision": "INVEST" or "PASS",
    "confidence": <a number between 0 and 100>,
    "reasoning": "<your concise reason here>"
  }
  Do not include markdown tags like \`\`\`json. Output RAW JSON only.`;

  const response = await model.invoke(prompt);
  
  try {
    const rawContent = response.content.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(rawContent);
    return {
      decision: result.decision,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error("Failed to parse Committee response:", error);
    // Fallback if parsing fails
    return {
      decision: "PASS",
      confidence: 0,
      reasoning: "AI failed to format decision properly."
    };
  }
}

// Compile the LangGraph
function buildGraph() {
  const workflow = new StateGraph(GraphState);

  // Add all our agents as nodes in the graph
  workflow.addNode("research", researchNode);
  workflow.addNode("growth", growthNode);
  workflow.addNode("risk", riskNode);
  workflow.addNode("sentiment", sentimentNode);
  workflow.addNode("committee", committeeNode);

  // Define the edges (flow of data)
  // Starts at the Research, Growth, Risk, Sentiment nodes in sequence.
  // Wait, the graph can run them in parallel. But for simplicity let's run them sequentially.
  workflow.addEdge(START, "research");
  workflow.addEdge("research", "growth");
  workflow.addEdge("growth", "risk");
  workflow.addEdge("risk", "sentiment");
  workflow.addEdge("sentiment", "committee");
  workflow.addEdge("committee", END);

  return workflow.compile();
}

async function runInvestmentCommittee(company) {
  const app = buildGraph();
  const initialState = { company };
  
  // Running the entire graph
  console.log(`Starting analysis graph for ${company}...`);
  const finalState = await app.invoke(initialState);
  
  return {
    overview: finalState.overview,
    growth: finalState.growth,
    risk: finalState.risk,
    sentiment: finalState.sentiment,
    decision: finalState.decision,
    confidence: finalState.confidence,
    reasoning: finalState.reasoning
  };
}

module.exports = {
  runInvestmentCommittee
};