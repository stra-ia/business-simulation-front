import { atom } from 'jotai'

export interface BriefPoints {
    isDone: boolean,
    id: string
}

const defaultBrief : BriefPoints[] = [
        {
            isDone: true,
            id: "goals",
        },
        {
            isDone: false,
            id: "productOrService",
        },
        {
            isDone: false,
            id: "targetMarket",
        },
        {
            isDone: false,
            id: "strategy",
        },
        {
            isDone: false,
            id: "tools",
        },
        {
            isDone: false,
            id: "kpis",
        },
]


export const briefPoints = atom<BriefPoints[]>(defaultBrief)