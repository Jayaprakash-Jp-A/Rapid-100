
import { GoogleGenAI } from "@google/genai";
import { MASTER_SYSTEM_PROMPT } from "../constants";
import { EmergencyIncident } from "../types";

export class GeminiService {
  /**
   * Always initializes a new instance to ensure the latest process.env.API_KEY 
   * (which may be updated by the AI Studio environment) is used for every request.
   */
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async processInput(input: string | { data: string; mimeType: string }): Promise<EmergencyIncident> {
    try {
      const ai = this.getClient();
      const parts = [];
      
      if (typeof input === 'string') {
        parts.push({ text: input });
      } else {
        // Support for audio/multimodal input using standard free-tier modalities
        parts.push({
          inlineData: {
            data: input.data,
            mimeType: input.mimeType
          }
        });
        parts.push({ text: "Perform full tactical analysis on this audio signal. Transcribe, translate to English, and categorize as defined in system instructions." });
      }

      // Using gemini-3-flash-preview: Best for Free Tier (High Speed, High RPM/RPD)
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          systemInstruction: MASTER_SYSTEM_PROMPT,
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });

      const rawJson = response.text.trim();
      const incidentData = JSON.parse(rawJson);
      
      return {
        ...incidentData,
        Transcript: typeof input === 'string' ? input : (incidentData.Transcript || "[Audio Signal Decoded]"),
        Timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("RAPID-X Signal Synthesis Error (Check API Key/Quota):", error);
      throw error;
    }
  }

  async generatePredictiveReport() {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a strategic forecasting report for the next 4 hours for a major metropolitan area. Include risk levels, surge zones, and resource allocation advice. Return JSON with 'risk_zones', 'surge_probability', and 'recommendations'.",
        config: {
          systemInstruction: "You are the RAPID-X Predictive Engine. Return JSON only.",
          responseMimeType: "application/json",
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
       // Fallback for demo stability if API rate limit is reached
       return { 
         risk_zones: ["Downtown Sector 4", "Industrial East"], 
         surge_probability: "75%", 
         recommendations: ["Pre-position medical units at major intersections"] 
       };
    }
  }
}
