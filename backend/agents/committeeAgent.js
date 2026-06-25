const { GoogleGenerativeAI } = require("@google/generative-ai");
const retry = require("../utils/geminiRetry");
require("dotenv").config();

async function committeeAgent(
  company,
  research,
  growth,
  risk,
  sentiment
) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY environment variable is not defined");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are the Investment Committee Agent.
Analyze the following research reports and assessments for the company ${company}:

1. Research Analysis:
${research}

2. Growth Analysis:
${growth}

3. Risk Analysis:
${risk}

4. Sentiment Analysis:
${sentiment}

Based on this information, make a final investment decision.
You must return your response in strictly valid JSON format, with no markdown formatting or extra text. The JSON object must have exactly these keys:
{
  "decision": "INVEST" or "PASS",
  "confidence": <an integer between 0 and 100 representing your confidence level>,
  "reasoning": "<concise professional explanation of the decision>",
  "simpleExplanation": "<a beginner-friendly simple summary of the decision>"
}

Do not include markdown tags like \`\`\`json. Output RAW JSON only.`;

    const response = await retry(() => model.generateContent(prompt));
    const rawText = response.response.text();
    
    // Clean code block if generated
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanedText);

    return {
      decision: result.decision || "PASS",
      confidence: Number(result.confidence) || 50,
      reasoning: result.reasoning || "No reasoning provided by AI.",
      simpleExplanation: result.simpleExplanation || "AI service temporarily unavailable."
    };
  } catch (error) {
    console.error(`Error in committeeAgent for ${company}:`, error);
    
    // If Gemini quota is exceeded or another error occurs, return fallback data instead of crashing:
    return {
      decision: "PASS",
      confidence: 50,
      reasoning: "Gemini quota exceeded.",
      simpleExplanation: "AI service temporarily unavailable."
    };
  }
}

module.exports = committeeAgent;