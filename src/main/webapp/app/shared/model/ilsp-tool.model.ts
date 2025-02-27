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

export interface IClaimVerificationRequest {
  doc_id: string;
  text: string;
  auth_key: string;
}

export interface IClaimVerificationResponse {
  doc_id: string;
  details: string;
  support: any[];
  refute: any[];
  no_info: INoInfo[];
}

interface INoInfo {
  sentence: string;
  doi: string;
}
