import {
  MarketinProposal,
  MarketingPrediction,
  Messages
} from '@/app/[lng]/chat/components/chatbox/utils/enums'
import { atom } from 'jotai'

export const isDisabledAtom = atom<boolean>(false)

export const messagesAtom = atom<Messages[]>([])

export const isFeedbackShowAtom = atom<boolean>(false)

export const feedbackAtom = atom<null | string>(null)

export const isLoadingFeedbackAtom = atom<boolean>(true)

export const audioSrcAtom = atom<string>('')
export const isRecordingAtom = atom<boolean>(false)

export const predictionAtom = atom<null | MarketingPrediction>(null)

export const marketingProposalAtom = atom<null | MarketinProposal>(null)

export const isShowedPredictionAtom = atom<boolean>(false)
