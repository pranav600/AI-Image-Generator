import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export default async function handler(req, res) {
  // Check for POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  // Check for empty prompt
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt cannot be empty" });
  }

  // Check for missing API key
  if (!process.env.HUGGINGFACE_API_KEY) {
    console.error("HUGGINGFACE_API_KEY is not set");
    return res.status(500).json({
      error: "API key not configured",
      details: "Please set the HUGGINGFACE_API_KEY environment variable",
    });
  }

  try {
    console.log("Generating image with prompt:", prompt);

    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0", // More widely supported model
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted, disfigured",
        num_inference_steps: 20,
        guidance_scale: 7.5,
        num_images: 1,
        width: 512,
        height: 512,
      },
    });

    if (!response) {
      throw new Error("No response from Hugging Face API");
    }

    // Convert response to base64
    const base64Image = Buffer.from(await response.arrayBuffer()).toString(
      "base64"
    );
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    res.status(200).json({ imageUrls: [imageUrl] });
  } catch (error) {
    console.error("Error occurred:", error);

    let statusCode = 500;
    let message = "Failed to generate images";
    let details = error.message || "Unknown error occurred";

    if (error.response && error.response.body) {
      try {
        const errorBody = await error.response.json();
        details =
          errorBody.error || errorBody.message || JSON.stringify(errorBody);
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        details = "Failed to parse error response";
      }
    }

    if (details.includes("API key")) {
      statusCode = 401;
      message = "Invalid API key. Please check your Hugging Face API key.";
    } else if (details.includes("rate limit")) {
      statusCode = 429;
      message = "Rate limit exceeded. Please try again later.";
    } else if (details.includes("No Inference Provider")) {
      statusCode = 500;
      message =
        "Model not available. Please check your API key permissions at https://huggingface.co/settings/tokens";
    } else if (details.includes("401")) {
      statusCode = 401;
      message = "Unauthorized. Please check your API key and permissions.";
    }

    res.status(statusCode).json({
      error: message,
      details,
      help: "Please make sure you have created an API key with the correct permissions at https://huggingface.co/settings/tokens",
    });
  }
}
