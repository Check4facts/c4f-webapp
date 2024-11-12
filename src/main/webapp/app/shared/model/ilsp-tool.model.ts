export interface ITranslationRequest {
  format: string;
  q: string;
  source: 'auto';
  target: 'en';
}

export interface ITranslationResponse {
  detectedLanguage: {
    confidence: number;
    language: string;
  };
  translatedText: string;
}
