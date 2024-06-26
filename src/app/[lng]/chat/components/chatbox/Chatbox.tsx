'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import style from './Chatbox.module.css'
import ChatboxBody from './ChatboxBody'
import { Messages, authorType } from './utils/enums'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Image from 'next/image'
import { validateDocFile } from './utils/validations'
import ChatboxFooter from './ChatboxFooter'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { briefPoints, briefResumeAtom } from '@/atoms/briefPoints'
import {
  audioSrcAtom,
  isDisabledAtom,
  marketingProposalAtom,
  messagesAtom,
  predictionAtom
} from '@/atoms/chatBot'
import { ChatbotService } from '@/services/ChatBotService'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { functionsTools, update_is_field } from './utils/chatGeminiFunctions'
import { typeArea } from '@/atoms/type'

const defaultBotMessage: Messages = {
  role: authorType.BOT,
  message: '',
  error: false,
  date: new Date()
}

export default function Chatbox() {
  const [messages, setMessages] = useAtom(messagesAtom)
  const [isSending, setIsSending] = useState(false)
  const salesObjects = useAtomValue(briefPoints)
  const setSalesObjects = useSetAtom(briefPoints)
  const setBriefResume = useSetAtom(briefResumeAtom)
  const setIsDisabled = useSetAtom(isDisabledAtom)
  const setMarketingPrediction = useSetAtom(predictionAtom)
  const setMarketingProposalAtom = useSetAtom(marketingProposalAtom)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

  const type: any = useAtomValue(typeArea)

  const { lng } = useParams()
  const { t } = useTranslation(lng, 'chatbox')

  defaultBotMessage.message = t(`ChatBox.${type.toLowerCase()}.messageStart`)

  const modelTextOnly = genAI.getGenerativeModel({
    model: 'gemini-pro',
    tools: [functionsTools]
  })
  const modelMultimedia = genAI.getGenerativeModel({
    model: 'gemini-pro-vision'
  })

  const chatHistory = [
    {
      role: authorType.BOT,
      parts: [
        {
          text: `You are StraIA, a chatbot engaged in facilitating the construction of customer profiles for sales training simulations. You must interact with users to gather essential information: the customer type, company size, and sales approach. It is important to process this information correctly to create an accurate simulation experience.

        Start by asking the user for the customer type. The possible types include CEO, Product Manager, or Sales. This determines the negotiation complexity in the simulation. When the user provides this information, update the customer field with the value and set the isField attribute to 'true' calling the function update_is_field.

        Next, you will need to find out the size of the company they are aiming to engage with. The company size will affect the sales strategy due to the difference in decision-making processes and complexity.Update the company_size field with the value and set the isField attribute to 'true' calling the function update_is_field obligatory.

        Then, determine the sales approach the user wishes to practice: Discovery, Demo, or Closer. Each approach entails different preparatory information and sales tactics. Update the sales_approach field with the value and set the isField attribute to 'true' calling the function update_is_field.

        Upon receiving each valid piece of information, verify if it corresponds to one of the fields that require an update (customer, company_size, or sales_approach). If it does, use the update_is_field function to set that field's isField attribute to 'true'. This action indicates that the field has been filled with the user's data.`
        }
      ]
    }
  ]

  chatHistory.unshift({
    role: authorType.USER,
    parts: [
      {
        text: ''
      }
    ]
  })

  const chat = modelTextOnly.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 100
    }
  })

  const [file, setFile] = useState<any[]>([])
  const [fileExtension, setFileExtension] = useState('')
  const [previewFile, setPreviewFile] = useState('')
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [recording, setRecording] = useState(false)
  const [loadingRecord, setLoadingRecord] = useState(false)
  const handleAddMessage = async (message: Messages, image: any = null) => {
    let arr = messages
    arr.push(message)
    setMessages([...arr])
    setIsSending(true)
    setIsDisabled(true)

    if (message.error) return

    if (image) {
      await handleSendMultimedia(message.message, image)
    } else {
      await handleSendMessage(message.message)
    }
  }

  const handleSend = async (prompt: string) => {
    const result: any = await chat.sendMessage(prompt)

    if (
      result.response.candidates &&
      result.response.candidates[0].content &&
      result.response.candidates[0].content.parts &&
      result.response.candidates[0].content.parts.length > 0 &&
      result.response.candidates[0].content.parts[0].functionCall
    ) {
      //   console.log('result', result.response.candidates[0].content)
      const { functionCall } = result.response.candidates[0].content.parts[0]
      //   console.log('functionCall', functionCall)
      if (
        functionCall.name === 'updateIsField' ||
        functionCall.name === 'update_is_field'
      ) {
        const newItems = update_is_field(
          functionCall.args.item_type,
          functionCall.args.new_value,
          salesObjects
        )
        setSalesObjects(newItems)
      }
    }
  }

  const handleSendMessage = async (prompt: string) => {
    // const result = await modelTextOnly.generateContentStream([prompt])

    await handleSend(prompt)

    let text = 'Mensaje de prueba'

    const historyModified: any = messages
      .filter((message) => message.message !== null && message.message !== '')
      .map((item: any) => {
        if (
          item.message &&
          (item.role === authorType.BOT || item.role === authorType.USER)
        )
          return {
            role: item.role,
            content: item.message
          }
      })
    historyModified.unshift({
      role: authorType.USER,
      content: 'Dame un mensaje de bienvenida'
    })

    const response = await ChatbotService.sendMessage(
      prompt,
      historyModified.slice(0, -1),
      type.toLowerCase()
    )
    const responseData = await response.json()
    text = responseData.message

    console.log('responseData', responseData)

    let arr = messages
    let newMessage: Messages = {
      role: authorType.BOT,
      message: text,
      error: false,
      date: new Date(),
      havePrediction: Boolean(responseData.marketing_prediction)
    }
    // console.log('responseData', responseData.clientBrief)

    if (responseData.clientBrief) {
      setBriefResume(responseData.clientBrief)

      const separatorMessage: Messages = {
        role: authorType.SEPARATOR,
        message: '',
        error: false,
        date: new Date()
      }
      arr.push(separatorMessage)
    }

    if (responseData.marketing_prediction) {
      setMarketingPrediction(responseData.marketing_prediction)
    }
    if (responseData.marketin_proposal) {
      setMarketingProposalAtom(responseData.marketin_proposal)
    }

    arr.push(newMessage)
    setMessages([...arr])
    setIsSending(false)
    setIsDisabled(false)
  }

  const handleSendVoice = async (voice: Blob) => {
    setRecording(true)
    setLoadingRecord(true)
    const historyModified: any = messages
      .filter((message) => message.message !== null && message.message !== '')
      .map((item: any) => {
        if (
          item.message &&
          (item.role === authorType.BOT || item.role === authorType.USER)
        )
          return {
            role: item.role,
            content: item.message
          }
      })
    historyModified.unshift({
      role: authorType.USER,
      content: 'Dame un mensaje de bienvenida'
    })
    const formData = new FormData()
    formData.append('file', voice)
    formData.append('history', JSON.stringify(historyModified))
    formData.append('type', type.toString())
    const response = await ChatbotService.sendMessageVoice(formData)
    const responseData = await response.json()
    console.log('responseData', responseData)
    const audioBlob = new Blob(
      [
        new Uint8Array(
          atob(responseData.voice)
            .split('')
            .map((char) => char.charCodeAt(0))
        )
      ],
      { type: 'audio/mpeg' }
    )
    const audioUrl = URL.createObjectURL(audioBlob)
    // const audio = new Audio(audioUrl)
    // audio.play()
    // setAudioTranscript(data.transcription)
    let arr = messages
    await handleSend(responseData.voice_message)
    let newMessage: Messages[] = [
      {
        role: authorType.USER,
        message: responseData.voice_message,
        error: false,
        date: new Date()
      },
      {
        role: authorType.BOT,
        message: responseData.message,
        voice: audioUrl,
        error: false,
        date: new Date()
      }
    ]
    arr.push(...newMessage)
    setRecording(false)
    setLoadingRecord(false)
    setMessages([...arr])
    setIsSending(false)
    setIsDisabled(false)
  }

  const handleSendMultimedia = async (prompt: string, image: any) => {
    const result = await modelMultimedia.generateContentStream([
      prompt,
      ...image
    ])

    let text = ''
    let arr = messages
    let newMessage: Messages = {
      role: authorType.BOT,
      message: '',
      error: false,
      date: new Date()
    }

    arr.push(newMessage)
    setMessages([...arr])

    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      text += chunkText
      arr[arr.length - 1].message = text
      setMessages([...arr])
    }

    setIsSending(false)
    setIsDisabled(false)
  }

  const getFileExtension = (name: string) => {
    return name.substring(name.lastIndexOf('.')).replace('.', '').toLowerCase()
  }

  const handleErrorFile = () => {
    setShowUploadButton(!showUploadButton)
    let newMessage: Messages = {
      role: authorType.USER,
      message: '',
      error: true,
      date: new Date()
    }
    handleAddMessage(newMessage)
    console.log('creando error')
  }

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != undefined && event.target.files?.length > 0) {
      if (!validateDocFile(event.target.files)) {
        handleErrorFile()
        return
      } else {
        let errorIndex = messages.find((item) => item.error == true)
        if (errorIndex != undefined) {
          let arr = messages.filter((item) => !item.error)
          setMessages([...arr])
        }
      }
      if (showUploadButton) setShowUploadButton(!showUploadButton)
      setFile([event.target.files[0]])
      console.log(event.target.files[0], 'file')
      setPreviewFile(URL.createObjectURL(event.target.files[0]))
      let filetype = getFileExtension(event.target.files[0].name)
      setFileExtension(filetype)
    }
  }

  const handleDropFile = (selectedFile: FileList) => {
    if (selectedFile && selectedFile.length > 0) {
      if (!validateDocFile(selectedFile)) {
        handleErrorFile()
        return
      }
      if (showUploadButton) setShowUploadButton(!showUploadButton)
      const fileList: any = selectedFile[0]
      setFile(fileList)
      setPreviewFile(URL.createObjectURL(fileList))
      let filetype = getFileExtension(fileList.name)
      setFileExtension(filetype)
    }
  }

  useEffect(() => {
    if (messages.length < 1) {
      let arr = messages
      arr.push(defaultBotMessage)
      setMessages([...arr])
    }
  }, [])

  useEffect(() => {}, [messages])

  return (
    <div className={style.main}>
      <div className={style.chatBotHeader}>
        <div className={style.chatBotHeaderIconContainer}>
          <Image
            priority
            src="/chatBubble.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
          />
        </div>
        <div className={style.chatBotHeaderTextContainer}>
          <p>
            Chat<span>Bot</span>
          </p>
        </div>
      </div>
      <ChatboxBody
        type={type}
        recording={recording}
        messages={messages}
        handleChangeFile={handleChangeFile}
        isSending={isSending}
      />

      <ChatboxFooter
        recording={loadingRecord}
        addMessage={handleAddMessage}
        handleChangeFile={handleChangeFile}
        handleDropFile={handleDropFile}
        previewFile={previewFile}
        setPreviewFile={setPreviewFile}
        fileExtension={fileExtension}
        setFileExtension={setFileExtension}
        showUploadButton={showUploadButton}
        setShowUploadButton={setShowUploadButton}
        fileData={file}
        setFile={setFile}
        setRecording={setRecording}
        handleSendVoice={handleSendVoice}
      />
    </div>
  )
}
