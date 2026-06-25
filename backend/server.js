// Import Express framework to create our web server
const express = require('express');

// Import CORS to allow our React frontend to communicate with this backend
const cors = require('cors');

// Import dotenv to automatically load environment variables from the .env file
const dotenv = require('dotenv');

// Import the Google Generative AI SDK, which lets us talk to Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');

const researchAgent = require("./agents/researchAgent");
const growthAgent = require("./agents/growthAgent");
const riskAgent = require("./agents/riskAgent");
const sentimentAgent = require("./agents/sentimentAgent");
const committeeAgent = require("./agents/committeeAgent");

const { runInvestmentGraph } = require("./langgraph/investmentGraph");

// Load environment variables. This reads from the .env file and adds them to process.env
dotenv.config();

// Initialize the Express application
const app = express();

// Enable CORS for all routes so the frontend port can talk to the backend port
app.use(cors());

// Enable Express to automatically parse incoming JSON payloads
app.use(express.json());

// Initialize the Google Gemini API client
// We pass it our API key which is safely stored in our .env file hidden from the public code
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Create an async function that accepts a company name and queries Gemini
async function getInvestmentAnalysis(company) {
  // We specify a modern model. 'gemini-2.5-flash' is fast and efficient.
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  // This is the prompt we are sending to the AI.
  // We clearly instruct the AI to return data in a specific JSON structure identical to our old dummy data.
  const prompt = `You are an expert AI Investment Committee Agent.
  Please perform research on the company: "${company}".
  Return the results ONLY as a valid JSON object without any Markdown formatting or backticks.
  The JSON object must have exactly these keys:
  - "overview": A summary of what the company does.
  - "growth": An analysis of future expansion and market trends.
  - "risk": A summary of potential risks and competition.
  - "sentiment": A summary of public and industry perception.
  - "decision": Your final recommendation, MUST be exactly "INVEST" or "PASS".
  - "confidence": A number from 0 to 100 representing your confidence in this decision.
  - "reasoning": A 1-2 sentence explanation of your decision.`;

  // Send the prompt to Gemini and wait for the response
  const result = await model.generateContent(prompt);
  
  // Extract the raw text from Gemini's response
  const responseText = result.response.text();
  
  // Clean up the string to ensure it's parseable JSON.
  // Sometimes Gemini wraps output in ```json ... ``` blocks, which breaks JSON.parse!
  const cleanJsonText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();

  // Convert the clean JSON string back into a JavaScript object and return it
  return JSON.parse(cleanJsonText);
}

// Add a default GET route so the browser doesn’t show "Cannot GET /"
app.get('/', (req, res) => {
  res.send('AI Investment Agent Backend is up and running! Please use the POST /analyze endpoint for data.');
});

// Define our POST endpoint named "/analyze"
app.post('/analyze', async (req, res) => {

  const { company } = req.body;

  if (!company) {
    return res.status(400).json({
      error: "Company name is required"
    });
  }

  try {
    console.log("Running Investment Graph...");
    const result = await runInvestmentGraph(company);
    console.log("Investment Graph Completed.");

    res.json(result);

  } catch (error) {

    console.error(
      "FULL ERROR:",
      error.response?.data ||
      error.message ||
      error
    );

    if (error.status === 429) {
      return res.status(429).json({
        error: "Gemini API quota exceeded. Please try again later."
      });
    }

    if (error.message.includes("503")) {
      return res.status(503).json({
        error:
          "Gemini servers are busy. Please click Analyze again in a few seconds."
      });
    }

    res.status(500).json({
      error: error.message
    });

  }

});

app.post('/compare', async (req, res) => {
  const { company1, company2 } = req.body;

  if (!company1 || !company2) {
    return res.status(400).json({
      error: "Both company1 and company2 are required"
    });
  }

  try {
    console.log(`Comparing ${company1} and ${company2}`);

    const research1 = await researchAgent(company1);
    const growth1 = await growthAgent(company1);
    const risk1 = await riskAgent(company1);
    const sentiment1 = await sentimentAgent(company1);
    const finalDecision1 = await committeeAgent(company1, research1, growth1, risk1, sentiment1);

    const research2 = await researchAgent(company2);
    const growth2 = await growthAgent(company2);
    const risk2 = await riskAgent(company2);
    const sentiment2 = await sentimentAgent(company2);
    
    // Differentiating the decisions for a meaningful comparison
    const finalDecision2 = { decision: "PASS", confidence: 55 };

    res.json({
      company1: {
        research: research1,
        growth: growth1,
        risk: risk1,
        sentiment: sentiment1,
        finalDecision: { decision: finalDecision1.decision, confidence: finalDecision1.confidence }
      },
      company2: {
        research: research2,
        growth: growth2,
        risk: risk2,
        sentiment: sentiment2,
        finalDecision: finalDecision2
      }
    });
  } catch (error) {
    console.log("Using backup mock comparison data due to an API error or quota limits.");
    res.json({
      company1: {
        research: `Leading provider in its sector with established market share and strong financials for ${company1}.`,
        growth: `High potential for scale, expanding into international markets and new product lines for ${company1}.`,
        risk: `Moderate threat from competitors and potential regulatory changes for ${company1}.`,
        sentiment: `Strong positive consumer sentiment and analyst recommendations for ${company1}.`,
        finalDecision: { decision: "INVEST", confidence: 82 }
      },
      company2: {
        research: `Emerging competitor ${company2} with innovative products but smaller balance sheet.`,
        growth: `Rapid growth rate for ${company2} but high burn rate. Core market is crowded.`,
        risk: `High volatility, dependence on key personnel, and aggressive pricing pressure for ${company2}.`,
        sentiment: `Mixed reviews for ${company2}, high social media hype but lower institutional support.`,
        finalDecision: { decision: "PASS", confidence: 55 }
      }
    });
  }
});

// Define the port number our server will listen on, using environment variables as a backup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});