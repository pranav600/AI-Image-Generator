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
  const [numImages, setNumImages] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setImages([]);

    try {
      const imageUrls = await generateImage(prompt, numImages);
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

  // Different animation styles for skeletons
  const skeletonAnimations = [
    "animate-pulse",
    "animate-pulse",
    "animate-pulse",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "generate":
        return (
          <div className="w-full max-w-7xl mx-auto px-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-8 w-full max-w-2xl mx-auto"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-4 pl-12 pr-28 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-teal-400"
                  required
                />
                <FaMagic className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={numImages}
                  onChange={(e) => setNumImages(Number(e.target.value))}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm"
                  style={{ minWidth: 80 }}
                >
                  <option value={1}>1 image</option>
                  <option value={2}>2 images</option>
                  <option value={3}>3 images</option>
                </select>
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
              <div className="flex justify-center gap-4 my-8">
                {Array.from({ length: numImages }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full max-w-[512px] aspect-square"
                  >
                    <div
                      className={`w-full h-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${
                        skeletonAnimations[index % skeletonAnimations.length]
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <div className="flex justify-center gap-4 mt-8 flex-wrap md:flex-nowrap">
                {images.map((imageUrl, index) => (
                  <div key={index} className="w-full max-w-[512px]">
                    <ImageCard
                      imageUrl={imageUrl}
                      prompt={prompt}
                      timestamp={Date.now() + index}
                    />
                  </div>
                ))}
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
