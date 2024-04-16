
export enum authorType  {
    BOT = 'model',
    USER = 'user'
}

export interface Messages {
    role: authorType,
    message: string,
    date: string | Date
}

export type HandleAdd = (
    message: Messages,
) => void;