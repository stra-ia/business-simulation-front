import { atom } from "jotai";

export const isDisabledAtom = atom<boolean>(false);
export const audioSrcAtom = atom<string>("");
export const isRecordingAtom = atom<boolean>(false);
