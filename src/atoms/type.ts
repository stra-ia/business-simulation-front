import { atom } from 'jotai'

export enum Area  {
    MARKETING = 'Marketing',
    SALES = 'Sales'
}

export const typeArea = atom<Area | null>(Area.MARKETING)