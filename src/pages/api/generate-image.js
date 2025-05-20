export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt, numImages } = req.body;

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
  const n = Math.max(1, Math.min(Number(numImages) || 1, 3));

  try {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const generateImage = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputs: trimmedPrompt,
              }),
            }
          );

          const arrayBuffer = await response.arrayBuffer();
          const contentType = response.headers.get("content-type");

          if (!response.ok) {
            const text = Buffer.from(arrayBuffer).toString("utf-8");
            throw new Error(text || "Failed to generate image");
          }

          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const dataUrl = `data:${contentType};base64,${base64}`;

          return dataUrl;
        } catch (err) {
          console.log(`Retry ${i + 1} failed:`, err.message);
          if (i === retries - 1) throw err;
          await wait(2000);
        }
      }
    };

    // Generate images in parallel
    const imagePromises = Array.from({ length: n }, () => generateImage());
    const imageUrls = await Promise.all(imagePromises);

    return res.status(200).json({ imageUrls });
  } catch (error) {
    console.error("❌ Final error:", error.message);
    return res.status(500).json({
      error: "Image generation failed",
      details: error.message || "Unexpected error occurred",
    });
  }
}
