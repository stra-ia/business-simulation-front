export enum authorType {
  BOT = 'model',
  USER = 'user',
  SEPARATOR = 'separator'
}

export enum AreaType {
  MARKETING = 'marketing',
  SALES = 'sales'
}

export interface fileType {
  fileURL: string
  fileData: any
  fileType: string
}

export interface Messages {
  role: authorType
  message: string
  file?: fileType
  error: boolean
  date: string | Date
  voice_message?: any
  voice?: any
  havePrediction?: boolean
}

export interface MarketingPrediction {
  categorical_score: string
  total_impressions: number
  user_input_impressions_over_spend: number
}

export interface MarketinProposal {
  user_creative_body: string
  user_headline: string
  user_link_description: string
  days_duration: number
  spend_by_day: number
}

export type HandleAdd = (message: Messages, file?: any) => void
