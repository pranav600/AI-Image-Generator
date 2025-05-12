import { useState } from "react";
import { generateImage } from "../utils/api";
import { useApp } from "../context/AppContext";
import ImageCard from "../components/ImageCard";
import { FaMagic, FaHistory, FaStar } from "react-icons/fa";

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
    setImages([]);

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
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-teal-400 text-transparent bg-clip-text">
                AI Image Generator
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-8 w-full max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-4 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-teal-400"
                  required
                />
                <FaMagic className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 border-none rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-500 text-white text-base font-bold cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 dark:hover:from-cyan-500 dark:hover:via-blue-600 dark:hover:to-indigo-600"
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Image"
                )}
              </button>
            </form>

            {error && (
              <div className="text-red-500 mb-4 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg mx-auto max-w-2xl">
                {error}
              </div>
            )}

            {loading && (
              <div className="w-full max-w-[512px] mx-auto my-8">
                <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl" />
              </div>
            )}

            {images.length > 0 && (
              <div className="flex justify-center w-full mt-8">
                <div className="w-full max-w-[512px]">
                  {images.map((imageUrl, index) => (
                    <ImageCard
                      key={index}
                      imageUrl={imageUrl}
                      prompt={prompt}
                      timestamp={Date.now()}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "favorites":
        return (
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <FaStar className="text-yellow-400" />
                Favorite Images
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your collection of favorite AI-generated images
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        );
      case "history":
        return (
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <FaHistory className="text-blue-400" />
                Generation History
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your recent AI image generations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <ImageCard
                  key={item.timestamp}
                  imageUrl={item.imageUrl}
                  prompt={item.prompt}
                  timestamp={item.timestamp}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen py-8">{renderContent()}</div>;
}
