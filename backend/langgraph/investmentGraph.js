const { StateGraph, Annotation, START, END } = require("@langchain/langgraph");

// Import the existing sub-agents so we can call them in the nodes
const researchAgent = require("../agents/researchAgent");
const growthAgent = require("../agents/growthAgent");
const riskAgent = require("../agents/riskAgent");
const sentimentAgent = require("../agents/sentimentAgent");
const committeeAgent = require("../agents/committeeAgent");

// 3. Define the graph state annotation.
// This object acts as the state schema, specifying the attributes that
// travel through each node of our state graph.
const StateAnnotation = Annotation.Root({
  company: Annotation(),
  research: Annotation(),
  growth: Annotation(),
  risk: Annotation(),
  sentiment: Annotation(),
  finalDecision: Annotation()
});

// 4. Create Node Functions.
// In LangGraph, nodes are functions that receive the current state, perform operations,
// and return partial state updates. Here, each node maps to one of our agents.
async function researchNode(state) {
  console.log("Research Node Started");
  const result = await researchAgent(state.company);
  console.log("Research Node Finished");
  return { research: result };
}

async function growthNode(state) {
  console.log("Growth Node Started");
  const result = await growthAgent(state.company);
  console.log("Growth Node Finished");
  return { growth: result };
}

async function riskNode(state) {
  console.log("Risk Node Started");
  const result = await riskAgent(state.company);
  console.log("Risk Node Finished");
  return { risk: result };
}

async function sentimentNode(state) {
  console.log("Sentiment Node Started");
  const result = await sentimentAgent(state.company);
  console.log("Sentiment Node Finished");
  return { sentiment: result };
}

async function committeeNode(state) {
  console.log("Committee Node Started");
  const decision = await committeeAgent(
    state.company,
    state.research,
    state.growth,
    state.risk,
    state.sentiment
  );
  console.log("Committee Node Finished");
  return { finalDecision: decision };
}

// 5. Build and sequence the state graph.
// We register each node, then connect them linearly using edges.
const workflow = new StateGraph(StateAnnotation)
  .addNode("researchNode", researchNode)
  .addNode("growthNode", growthNode)
  .addNode("riskNode", riskNode)
  .addNode("sentimentNode", sentimentNode)
  .addNode("committeeNode", committeeNode)
  
  // Connect graph nodes starting from START to END
  .addEdge(START, "researchNode")
  .addEdge("researchNode", "growthNode")
  .addEdge("growthNode", "riskNode")
  .addEdge("riskNode", "sentimentNode")
  .addEdge("sentimentNode", "committeeNode")
  .addEdge("committeeNode", END);

// Compile the workflow into a runnable app
const app = workflow.compile();

// 6. Export graph runner function.
// This exposes a single entrypoint function to the rest of the backend app.
async function runInvestmentGraph(company) {
  const initialState = {
    company: company,
    research: "",
    growth: "",
    risk: "",
    sentiment: "",
    finalDecision: null
  };

  console.log("================================");
  console.log(`Analyzing Company: ${company}`);
  console.log("Running Investment Graph...");
  console.log("================================");

  try {
    // Run the graph with the initial state and return the final state
    const finalState = await app.invoke(initialState);

    console.log("================================");
    console.log("Investment Graph Completed.");
    console.log("================================");

    return finalState;
  } catch (error) {
    console.error("Investment Graph Error:", error);
    throw error;
  }
}

module.exports = {
  runInvestmentGraph
};
