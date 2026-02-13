
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // Always use process.env.API_KEY directly for initialization
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const chatWithGemini = async (message: string, history: {role: 'user'|'model', parts: {text: string}[]}[]) => {
  const ai = getAIClient();
  
  // Directly calling generateContent with model and prompt as per updated guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are a helpful mobile assistant. Keep responses concise and mobile-friendly (use lists and short paragraphs). Language: Indonesian.",
    }
  });

  return response.text;
};

export const getDailyBriefing = async () => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Berikan ringkasan berita terkini di Indonesia hari ini dalam 3 poin singkat.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { text, sources };
};
