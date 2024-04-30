export enum authorType {
  BOT = "model",
  USER = "user",
}

export enum AreaType {
  MARKETING = "marketing",
  SALES = "sales",
}

export interface fileType {
  fileURL: string;
  fileData: any;
  fileType: string;
}

export interface Messages {
  role: authorType;
  message: string;
  file?: fileType;
  error: boolean;
  date: string | Date;
  voice_message?: any;
  voice?: any;
}

export type HandleAdd = (message: Messages, file?: any) => void;
