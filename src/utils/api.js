export async function generateImage(prompt) {
  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error || data.details || "Failed to generate images";
      throw new Error(errorMessage);
    }

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
