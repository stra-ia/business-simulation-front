export enum authorType {
  BOT = "model",
  USER = "user",
}

export enum AreaType {
  MARKETING = "marketing",
  SALES = "sales",
}

export interface fileType {
  fileData: any;
  fileType: string;
  blob?: Blob;
}

export interface Messages {
  role: authorType;
  message: string | Blob;
  file?: fileType;
  date: string | Date;
  blob?: fileType;
}

export type HandleAdd = (message: Messages, file?: any) => void;
