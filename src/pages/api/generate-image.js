import { HfInference } from "@huggingface/inference";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt, numImages = 1 } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "Invalid prompt",
      details: "Prompt must be a string",
    });
  }

  const trimmedPrompt = prompt.trim();
  if (trimmedPrompt.length === 0) {
    return res.status(400).json({
      error: "Invalid prompt",
      details: "Prompt cannot be empty",
    });
  }

  // Clamp numImages between 1 and 3
  const n = Math.max(1, Math.min(Number(numImages), 3));

  try {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

    // Check if API key is available
    if (!HUGGINGFACE_API_KEY) {
      console.error("HUGGINGFACE_API_KEY is not set in environment variables");
      return res.status(500).json({
        error: "Server configuration error",
        details:
          "API key is not configured. Please check your server settings.",
      });
    }

    const hf = new HfInference(HUGGINGFACE_API_KEY);

    const generateImage = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(
            `Attempt ${i + 1} to generate image with prompt:`,
            trimmedPrompt
          );

          // Using the Nebius provider with FLUX.1-dev model
          const response = await hf.textToImage({
            provider: "nebius",
            model: "black-forest-labs/FLUX.1-dev",
            inputs: trimmedPrompt,
            parameters: {
              num_inference_steps: 25, // Increased from 5 for better quality
              guidance_scale: 7.5, // Added for better quality
              height: 1024, // Standard size
              width: 1024, // Standard size
            },
          });

          console.log("Received image from Hugging Face API");

          // Convert Blob to base64
          const arrayBuffer = await response.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          return `data:image/png;base64,${base64}`;
        } catch (err) {
          console.error(`Attempt ${i + 1} failed:`, err.message);
          if (i === retries - 1) {
            console.error("All retry attempts failed");
            throw err;
          }
          console.log(
            `Retrying in 2 seconds... (${retries - i - 1} attempts remaining)`
          );
          await wait(2000);
        }
      }
    };

    // Generate images in parallel
    const imagePromises = Array.from({ length: n }, () => generateImage());
    const imageUrls = await Promise.all(imagePromises);

    return res.status(200).json({ imageUrls });
  } catch (error) {
    console.error("❌ Final error:", error);
    return res.status(500).json({
      error: "Image generation failed",
      details: error.message || "Unexpected error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
