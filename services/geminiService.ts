import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image using Gemini 2.5 Flash Image based on a text prompt.
 * 
 * @param base64Image The source image in base64 format (no data URI prefix).
 * @param mimeType The mime type of the image (e.g., 'image/png').
 * @param prompt The text instruction for editing (e.g., "Add a retro filter").
 * @returns The base64 string of the generated image.
 */
export const editImageWithGemini = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};
