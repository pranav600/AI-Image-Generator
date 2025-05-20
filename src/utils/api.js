export async function generateImage(prompt, numImages = 1) {
  try {
    // Ensure the prompt is not empty or just whitespace
    if (!prompt.trim()) {
      throw new Error("Prompt cannot be empty");
    }

    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt.trim(), numImages }),
    });

    // Check for non-JSON responses
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      const errorMessage =
        errorDetails.error ||
        errorDetails.details ||
        response.statusText ||
        "Failed to generate images";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate the response structure
    if (
      !data.imageUrls ||
      !Array.isArray(data.imageUrls) ||
      data.imageUrls.length === 0
    ) {
      throw new Error("No images were generated");
    }

    return data.imageUrls;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw new Error(error.message || "Failed to generate images");
  }
}
