import { FileAttachment } from '@/types/chat';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCzPkXJL0HURMG1DtAyC-oeSSZzL26cg8o";

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

export const generateGeminiResponse = async (
  prompt: string,
  attachment?: FileAttachment
): Promise<string> => {
  const requestBody: any = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  // Add image attachment if provided
  if (attachment?.data && attachment?.mime_type) {
    requestBody.contents[0].parts.push({
      inline_data: {
        mime_type: attachment.mime_type,
        data: attachment.data.split(',')[1] // Remove data:image/xxx;base64, prefix
      }
    });
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();
  
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('No response from API');
  }

  // Clean up markdown formatting
  return data.candidates[0].content.parts[0].text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .trim();
};