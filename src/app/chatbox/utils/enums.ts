
export enum authorType  {
    BOT = 'model',
    USER = 'user'
}

export interface Messages {
    role: authorType,
    message: string,
    image?: string,
    date: string | Date
}

export type HandleAdd = (
    message: Messages,
    image?: any
) => void;