
import { GoogleGenAI } from "@google/genai";
import { ScriptFormData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScript = async (formData: ScriptFormData): Promise<string> => {
  const { prompt, genre, characters, setting, language } = formData;

  const fullPrompt = `
    Напиши полный сценарий для короткометражного фильма, основываясь на следующих деталях.
    Сценарий должен быть отформатирован по стандартному голливудскому формату (сцены, имена персонажей по центру, диалоги, описания действий).
    Длительность сценария должна быть примерно 3-5 страниц.
    Язык сценария: ${language}.

    ---
    Основная идея / Логлайн: ${prompt}
    Жанр: ${genre}
    Главные персонажи (описание): ${characters}
    Место действия / Сеттинг: ${setting}
    ---

    НАЧАЛО СЦЕНАРИЯ:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
};
