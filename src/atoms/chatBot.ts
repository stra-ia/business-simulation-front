import { Messages } from '@/app/[lng]/chat/components/chatbox/utils/enums'
import { atom } from 'jotai'

export const isDisabledAtom = atom<boolean>(false)

export const messagesAtom = atom<Messages[]>([])

export const isFeedbackShowAtom = atom<boolean>(false)

export const feedbackAtom = atom<null | string>(null)

export const isLoadingFeedbackAtom = atom<boolean>(true)
