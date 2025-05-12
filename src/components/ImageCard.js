import { useState } from "react";
import { useApp } from "../context/AppContext";

const ImageCard = ({ imageUrl, prompt, timestamp, isFavorite = false }) => {
  const { addToFavorites, removeFromFavorites } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(timestamp);
    } else {
      addToFavorites(prompt, imageUrl);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "AI Generated Image",
        text: `Check out this AI generated image: ${prompt}`,
        url: imageUrl,
      });
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(imageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${timestamp}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:-translate-y-1 w-full max-w-[512px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-4 p-4 bg-black/70 rounded-lg">
            <button
              onClick={handleFavorite}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 ${
                isFavorite
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "★" : "☆"}
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 hover:bg-gray-600"
              title="Share image"
            >
              {isCopied ? "✓" : "↗"}
            </button>
            <button
              onClick={handleDownload}
              className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 hover:bg-gray-600"
              title="Download image"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
      {/* <p className="p-4 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 truncate">
        {prompt}
      </p> */}
    </div>
  );
};

export default ImageCard;
