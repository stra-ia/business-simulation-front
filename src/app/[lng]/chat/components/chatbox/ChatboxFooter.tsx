import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, Messages, authorType, fileType } from './utils/enums'
import Image from 'next/image'
import { validateDocFile, validateImageFile } from './utils/validations'
import { useAtomValue, useSetAtom } from 'jotai'
import { isDisabledAtom, isRecordingAtom } from '@/atoms/chatBot'

import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import { MutatingDots } from 'react-loader-spinner'

interface ChatboxFooterProps {
  addMessage: HandleAdd
  handleChangeFile: any
  handleDropFile: any
  fileData: any
  setFile: any
  previewFile: any
  setPreviewFile: any
  fileExtension: any
  setFileExtension: any
  showUploadButton: any
  setShowUploadButton: any
  handleSendVoice: any
  setRecording: any
  recording: boolean
}

export default function ChatboxFooter({
  addMessage,
  handleChangeFile,
  handleDropFile,
  previewFile,
  setPreviewFile,
  fileExtension,
  setFileExtension,
  showUploadButton,
  setShowUploadButton,
  fileData,
  setFile,
  handleSendVoice,
  setRecording,
  recording
}: ChatboxFooterProps) {
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isDisabled = useAtomValue(isDisabledAtom)
  const [isCanceled, setIsCanceled] = useState(false)
  const [isOpenedRecorder, setIsOpenedRecorder] = useState(false)
  const {
    stopRecording,
    togglePauseResume,
    startRecording,
    isPaused,
    recordingBlob,
    isRecording,
    recordingTime
  } = useAudioRecorder()
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    console.log(audio, 'audio')

    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isDisabled])

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const fileToGenerativePart = async (item: any) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader()
      if (reader) {
        reader.onloadend = () => resolve(reader.result?.split(',')[1])
        reader.readAsDataURL(item)
      }
    })
    let data = await base64EncodedDataPromise
    return {
      inlineData: {
        data,
        mimeType: item.type
      }
    }
  }

  const handleCreateMessage = async () => {
    if (!message || message.length < 1) {
      return
    }
    if (!previewFile) {
      let newMessage: Messages = {
        role: authorType.USER,
        message: message,
        error: false,
        date: new Date()
      }
      addMessage(newMessage)
      setMessage('')
    } else {
      // const imageParts = await Promise.all(
      //     file.map(fileToGenerativePart)
      //   );
      let newMessage: Messages = {
        role: authorType.USER,
        message: message,
        file: {
          fileURL: previewFile,
          fileData: fileData[0],
          fileType: fileExtension
        },
        error: false,
        date: new Date()
      }
      console.log(newMessage, 'newMessage')
      // addMessage(newMessage, imageParts)
      addMessage(newMessage)
      setMessage('')
      setPreviewFile('')
      setFileExtension('')
      setFile([])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateMessage()
    }
  }

  const calculateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}: ${
      remainingSeconds >= 10 ? '' : '0'
    } ${remainingSeconds}`
  }

  const handleCancelRecording = () => {
    stopRecording()
    setIsCanceled(true)
    setRecording(false)
  }

  useEffect(() => {
    if (!recordingBlob) return
    ;(async () => {
      if (isCanceled) return
      handleSendVoice(recordingBlob)
    })()
  }, [recordingBlob])

  return (
    <div className={style.footer}>
      {isOpenedRecorder && (
        <div className={style.recordContainer}>
          <div
            style={{
              width: '30vw',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              gap: '10px'
            }}
          >
            {recording ? (
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="white"
                secondaryColor="white"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <>
                <button
                  className={style.roundButton}
                  onClick={handleCancelRecording}
                >
                  <Image
                    priority
                    src="/button3.svg"
                    height={100}
                    width={100}
                    alt="Upload image"
                  />
                </button>
                <button
                  style={{
                    width: '150px',
                    height: '150px'
                  }}
                  onClick={() => {
                    if (isRecording) {
                      stopRecording()
                    } else {
                      setIsCanceled(false)
                      setRecording(true)
                      startRecording()
                    }
                  }}
                  className={
                    style.roundButton +
                    ' ' +
                    (isRecording ? style.recording : '')
                  }
                >
                  <Image
                    priority
                    src={isRecording ? '/button4.svg' : '/button1.svg'}
                    height={150}
                    width={150}
                    alt="Upload image"
                  />
                  <h5>{calculateTime(recordingTime)}</h5>
                </button>

                <button
                  onClick={() => {
                    togglePauseResume()
                  }}
                  className={style.roundButton}
                >
                  <Image
                    priority
                    src="/button2.svg"
                    height={100}
                    width={100}
                    alt="Upload image"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {showUploadButton && (
        <div className={style.fileContainer}>
          <div
            className={style.form__files}
            onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
              event.preventDefault()
            }}
            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
              event.preventDefault()
              if (
                event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length > 0
              ) {
                const fileList: any = Array.from(event.dataTransfer.files)
                handleDropFile(fileList)
              }
            }}
            onClick={(event) => {
              if (fileInputRef.current) {
                fileInputRef.current.click()
              }
            }}
            draggable={true}
          >
            <Image
              priority
              src="/upload.svg"
              height={20}
              width={30}
              className={style.iconUpload}
              alt="Upload image"
            />
            <h3>Drag and dop file XLS or PDF here</h3>
            <h3>or</h3>
            <button className={style.uploadButton}>
              <p>Browse file</p>
            </button>
            <input
              type="file"
              onChange={handleChangeFile}
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>
      )}

      <div className={style.footerButtons}>
        <button
          className={style.button}
          name="attach"
          type="button"
          onClick={() => setShowUploadButton(!showUploadButton)}
          disabled={isDisabled}
        >
          <Image
            priority
            src="/clip.svg"
            alt="Attach image"
            width={15}
            height={15}
            className={style.iconFooter}
          />
        </button>

        {!isOpenedRecorder && (
          <>
            <input
              className={style.input}
              placeholder="Write something..."
              value={message}
              onKeyDown={handleKeyDown}
              onChange={handleChangeMessage}
              type="text"
            />
            <button
              className={style.button}
              onClick={handleCreateMessage}
              name="button"
              type="button"
            >
              <Image
                priority
                src="/paper-plane.svg"
                alt="Send"
                width={15}
                height={15}
                className={style.iconFooter}
              />
            </button>
          </>
        )}
        <button
          onClick={() => setIsOpenedRecorder(!isOpenedRecorder)}
          className={style.buttonVoice}
          name="button"
          type="button"
          disabled={isDisabled}
        >
          <Image
            priority
            src={isOpenedRecorder ? '/mensaje.png' : '/microphone.svg'}
            alt="Voice"
            width={15}
            height={15}
            className={style.iconFooter}
          />
        </button>
      </div>
    </div>
  )
}
