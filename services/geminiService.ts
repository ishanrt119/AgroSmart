import { GoogleGenAI, Type } from "@google/genai";
import { CropRecommendation, Advertisement, GovernmentScheme, ChatMessage, ChatUser } from "../types";
import { AI_ASSISTANT_USER_ID } from "../data/chatData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getCropRecommendations = async (
  season: string,
  soilType: string,
  altitude: number
): Promise<CropRecommendation[]> => {
  const prompt = `
    As an expert in agriculture for hilly regions of India, provide crop recommendations.
    
    Current Conditions:
    - Season: ${season}
    - Soil Type: ${soilType}
    - Altitude: ${altitude} meters
    
    Provide a list of 3 suitable crops. For each crop, provide:
    1. The crop name.
    2. 3 to 4 bullet points explaining *why* this crop is recommended based on the provided conditions (season, soil, altitude).
    3. The ideal sowing season.
    4. The approximate growing period.
    5. Its water needs (low, medium, high).
    
    Focus on crops that are efficient and profitable for small-scale farmers in these regions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              cropName: {
                type: Type.STRING,
                description: "Name of the crop.",
              },
              recommendationReasons: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 3-4 strings explaining why the crop is recommended.",
              },
              sowingSeason: {
                type: Type.STRING,
                description: "The best time/season to sow this crop.",
              },
              growingPeriod: {
                type: Type.STRING,
                description: "Approximate time from sowing to harvest (e.g., 90-100 days).",
              },
              waterNeeds: {
                type: Type.STRING,
                description: "General water requirement (e.g., Low, Medium, High).",
              },
            },
            required: ["cropName", "recommendationReasons", "sowingSeason", "growingPeriod", "waterNeeds"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const recommendations: CropRecommendation[] = JSON.parse(jsonText);
    return recommendations;
  } catch (error) {
    console.error("Error fetching crop recommendations:", error);
    throw new Error("Failed to get recommendations from Gemini API.");
  }
};

export const getAdvertisements = async (): Promise<Advertisement[]> => {
  const prompt = `
    As a marketing expert for an agriculture technology company, create 3 fictional but realistic advertisements for products relevant to farmers in the hilly regions of India.
    
    For each advertisement, provide:
    1. A fictional but plausible company name (e.g., "Himalayan Organics", "TerraGrow Tools").
    2. A catchy product name (e.g., "Giri Shakti Bio-Fertiliser", "PeakPower Tiller").
    3. A short, compelling description (2-3 sentences) highlighting the product's benefits for hilly farming.
    4. A call-to-action text for a button (e.g., "Learn More", "Get a Quote").
    5. A simple, descriptive prompt for an AI image generator to create a picture of the product. The prompt should be like 'A sturdy handheld tiller machine in a field', or 'A bag of organic fertiliser with mountains in the background'.

    The advertisements should cover a range of products, such as organic fertilisers, modern farming tools, or small-scale machinery.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              company: {
                type: Type.STRING,
                description: "Fictional company name.",
              },
              productName: {
                type: Type.STRING,
                description: "Catchy name for the product.",
              },
              description: {
                type: Type.STRING,
                description: "Short, compelling product description.",
              },
              callToActionText: {
                type: Type.STRING,
                description: "Text for the call-to-action button.",
              },
              imagePrompt: {
                type: Type.STRING,
                description: "A short prompt for an AI image generator.",
              },
            },
            required: ["company", "productName", "description", "callToActionText", "imagePrompt"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const ads: Advertisement[] = JSON.parse(jsonText);
    return ads;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw new Error("Failed to get advertisements from Gemini API.");
  }
};

export const getGovernmentSchemes = async (): Promise<GovernmentScheme[]> => {
    const prompt = `
      As an expert on Indian agricultural policies, provide a list of 3 fictional but realistic and relevant government schemes for farmers in hilly regions like Sikkim, Uttarakhand, or Himachal Pradesh. 
      
      Include a mix of Central and State government schemes. 
      
      For each scheme, provide:
      1.  A plausible scheme name (e.g., "Pradhan Mantri Fasal Bima Yojana", "Himalayan Krishi Vikas Yojana").
      2.  The issuing body (e.g., "Central Government", "State Government of Sikkim").
      3.  A concise one-sentence description of the scheme's main goal.
      4.  An array of 3-4 key benefits for the farmer, written as strings.
      5.  A brief, one-sentence summary of the eligibility criteria.
      6.  A fictional but realistic-looking official link (e.g., "https://pmkvy.gov.in", "https://agri.sikkim.gov.in/himalayan-yojana").
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                schemeName: { type: Type.STRING },
                issuingBody: { type: Type.STRING },
                description: { type: Type.STRING },
                benefits: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                eligibility: { type: Type.STRING },
                link: { type: Type.STRING },
              },
              required: ["schemeName", "issuingBody", "description", "benefits", "eligibility", "link"],
            },
          },
        },
      });
  
      const jsonText = response.text.trim();
      const schemes: GovernmentScheme[] = JSON.parse(jsonText);
      return schemes;
    } catch (error) {
      console.error("Error fetching government schemes:", error);
      throw new Error("Failed to get government schemes from Gemini API.");
    }
};


export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '4:3',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("No images were generated.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error)
 {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image from Gemini API.");
  }
};

export const getAiChatResponse = async (chatHistory: ChatMessage[], currentUser: ChatUser): Promise<string> => {
    const systemInstruction = "You are Agro Assistant, a helpful AI expert in agriculture, especially for hilly regions in India like Sikkim. Your answers should be concise, helpful, and easy to understand for farmers. Always be polite and encouraging. Respond in the same language as the user's last message.";

    const formattedHistory = chatHistory.map(message => {
        const role = message.senderId === currentUser.id ? "Farmer" : "Assistant";
        return `${role}: ${message.text}`;
    }).join('\n');

    const prompt = `${systemInstruction}\n\nHere is the conversation so far:\n${formattedHistory}\n\nAssistant:`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                maxOutputTokens: 250,
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};