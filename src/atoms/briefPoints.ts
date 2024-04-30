import { atom } from 'jotai'

export interface BriefPoints {
  isField: boolean
  type: string
}

const defaultBrief = [
  {
    type: 'customer',
    isField: false,
    title: 'Tipo de cliente',
    description: 'Especifica el tipo de cliente para practicar'
  },
  {
    type: 'company_size',
    isField: false,
    title: 'Tamaño de la empresa',
    description: 'Menciona el tamaño de la empresa para practicar'
  },
  {
    type: 'sales_approach',
    isField: false,
    title: 'Tipo de venta',
    description: 'Indica el tipo de venta para practicar'
  }
]

export const briefPoints = atom<BriefPoints[]>(defaultBrief)

export const briefResumeAtom = atom<null | string>(null)
