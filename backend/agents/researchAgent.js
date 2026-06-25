const { GoogleGenerativeAI } = require("@google/generative-ai");
const retry = require("../utils/geminiRetry");
require("dotenv").config();

async function researchAgent(company) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY environment variable is not defined");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a professional investment research analyst.
Analyze the company: ${company}.
Provide a structured, clean, and concise plain-text report outlining the following details:
- Company Overview
- Industry
- Products
- Business Model

Format each section clearly, avoiding any markdown formatting like bolding, asterisks, or hash symbols.`;

    const response = await retry(() => model.generateContent(prompt));
    return response.response.text();
  } catch (error) {
    console.error(`Error in researchAgent for ${company}:`, error);
    
    // Check if it's a quota error or any API error, and return fallback data
    return `Company: ${company}

Industry: Technology/General (Fallback)

Products: Enterprise Software & Hardware Solutions (Fallback)

Business Model: B2B/B2C (Fallback)

(Note: Gemini API unavailable or quota exceeded. Displaying local fallback data.)`;
  }
}

module.exports = researchAgent;