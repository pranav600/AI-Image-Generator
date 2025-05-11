import { useState } from "react";
import { generateImage } from "../utils/api";
import { useApp } from "../context/AppContext";
import ImageCard from "../components/ImageCard";


export default function Home() {
  const { theme, addToHistory, favorites, history, activeTab } = useApp();
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const imageUrls = await generateImage(prompt);
      setImages(imageUrls);
      imageUrls.forEach((url) => addToHistory(prompt, url));
    } catch (err) {
      const errorMessage =
        err.message || err.toString() || "Failed to generate image";
      console.error("Error generating image:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "generate":
        return (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-8 w-full max-w-2xl mx-auto px-4 sm:px-6"
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base transition-all duration-300 focus:outline-none focus:border-teal-400"
                required
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 border-none rounded-lg bg-gradient-to-r from-red-400 to-teal-400 text-white text-sm sm:text-base font-bold cursor-pointer transition-transform duration-200 hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading || !prompt.trim()}
              >
                {loading ? "Generating..." : "Generate Image"}
              </button>
            </form>

            {error && (
              <div className="text-red-500 mb-4 p-3 sm:p-4 bg-red-100 dark:bg-red-900/20 rounded-lg mx-4 sm:mx-6">
                {error}
              </div>
            )}

            {loading && (
              <div className="w-full max-w-[512px] mx-auto my-6 sm:my-8 px-4 sm:px-6">
                <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl" />
              </div>
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full justify-center p-4">
                {images.map((imageUrl, index) => (
                  <ImageCard
                    key={index}
                    imageUrl={imageUrl}
                    prompt={prompt}
                    timestamp={Date.now()}
                  />
                ))}
              </div>
            )}
          </>
        );
      case "favorites":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-center p-4">
            {favorites.map((item) => (
              <ImageCard
                key={item.timestamp}
                imageUrl={item.imageUrl}
                prompt={item.prompt}
                timestamp={item.timestamp}
                isFavorite={true}
              />
            ))}
          </div>
        );
      case "history":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-center p-4">
            {history.map((item) => (
              <ImageCard
                key={item.timestamp}
                imageUrl={item.imageUrl}
                prompt={item.prompt}
                timestamp={item.timestamp}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-50 to-white text-gray-800"
      }`}
    >
      <main className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}
