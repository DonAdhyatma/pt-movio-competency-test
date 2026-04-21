import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not set in .env.local");

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json(
        { error: "Ingredients are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are a professional chef assistant. Based on the following ingredients, suggest 3 recipes.

Ingredients the user has: ${ingredients}

Respond ONLY with a valid JSON array (no markdown, no backticks, no explanation) in this exact format:
[
  {
    "name": "Recipe Name",
    "emoji": "🍳",
    "cookTime": "20 mins",
    "difficulty": "Easy",
    "description": "A short one-sentence description of this dish.",
    "steps": [
      "Step 1 description",
      "Step 2 description",
      "Step 3 description"
    ],
    "missingIngredients": ["ingredient1", "ingredient2"]
  }
]

Rules:
- Prioritize recipes that use MOST of the provided ingredients
- missingIngredients: list only 1-3 common items the user might need to buy
- difficulty: only use "Easy", "Medium", or "Hard"
- Keep steps concise, max 5 steps per recipe
- Return exactly 3 recipes
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean response & parse JSON
    const cleaned = text.replace(/```json|```/g, "").trim();
    const recipes = JSON.parse(cleaned);

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recipes. Please try again." },
      { status: 500 }
    );
  }
}