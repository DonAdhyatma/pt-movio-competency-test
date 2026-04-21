"use client";

import { useState } from "react";

interface Recipe {
  name: string;
  emoji: string;
  cookTime: string;
  difficulty: string;
  description: string;
  steps: string[];
  missingIngredients: string[];
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError("");
    setRecipes([]);
    setExpandedCard(null);

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecipes(data.recipes);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-br from-green-50 via-white to-emerald-50">

      {/* Header */}
      <header className="bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-5">

          {/* icon + title + badge */}
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl shrink-0">🍳</span>

            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-green-800 leading-tight truncate">
                ArtificialChef AI
              </h1>
              
              <p className="hidden sm:block text-sm text-gray-500">
                Turn your ingredients into recipes instantly
              </p>
            </div>

            {/* Badge: teks diperpendek di mobile */}
            <span className="shrink-0 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">
              <span className="sm:hidden">Gemini AI</span>
              <span className="hidden sm:inline">Powered by Gemini API</span>
            </span>
          </div>

          {/* Subtitle khusus mobile — tampil di bawah row utama */}
          <p className="sm:hidden text-xs text-gray-400 mt-1 ml-9">
            Turn your ingredients into recipes instantly
          </p>

        </div>
      </header>
      
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">

        {/* ── Input Form ── */}
        <form onSubmit={handleSubmit} className="mb-10">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What ingredients do you have? 🥬
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. eggs, onion, tofu, soy sauce, garlic, rice..."
            rows={3}
            className="w-full border border-gray-400 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
                       resize-none shadow-sm transition text-black"
          />
          <button
            type="submit"
            disabled={loading || !ingredients.trim()}
            className="mt-3 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300
                       text-white font-semibold py-3 rounded-xl transition-all duration-200
                       flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span> Finding recipes...
              </>
            ) : (
              <>✨ Find Recipes</>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Recipe Cards */}
        {recipes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">
              Here are your recipes! 🎉
            </h2>
            {recipes.map((recipe, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                >
                  <span className="text-4xl">{recipe.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        ⏱ {recipe.cookTime}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          difficultyColor[recipe.difficulty] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">
                    {expandedCard === i ? "▲" : "▼"}
                  </span>
                </div>

                {expandedCard === i && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        📋 Steps
                      </h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, j) => (
                          <li key={j} className="flex gap-3 text-sm text-gray-700">
                            <span className="shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                              {j + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {recipe.missingIngredients?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          🛒 You might also need
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.missingIngredients.map((item, j) => (
                            <span
                              key={j}
                              className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && !error && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🥗</p>
            <p className="text-sm">Enter your ingredients above to get started!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100">
        ArtificialChef AI App - Test Participant: Danni Adhyatma Rachman
      </footer>
    </main>
  );
}