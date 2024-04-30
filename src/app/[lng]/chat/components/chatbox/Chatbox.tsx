"use client";
import React, { ChangeEvent, useEffect, useState } from 'react'
import style from './Chatbox.module.css'
import ChatboxBody from './ChatboxBody'
import { AreaType, Messages, authorType } from './utils/enums';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Image from 'next/image';
import { validateDocFile } from './utils/validations';
import ChatboxFooter from './ChatboxFooter';

const defaultBotMessage : Messages = {
    role: authorType.BOT,
    message: '¡Hola! ¿como puedo ayudarte?',
    error: false,
    date: new Date(),
}

interface ChatBoxProps {
    type?: AreaType
}

export default function Chatbox({ type = AreaType.MARKETING } : ChatBoxProps) {

    const [messages, setMessages] = useState<Messages[]>([])
    const genAI = new GoogleGenerativeAI('AIzaSyAszMvafUVl4PJq0XNAm6obfCAe3KF13t4');
    const modelTextOnly = genAI.getGenerativeModel({ model: "gemini-pro" });
    const modelMultimedia = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const [file, setFile] = useState<any[]>([])
    const [fileExtension, setFileExtension] = useState('')
    const [previewFile, setPreviewFile] = useState('')
    const [showUploadButton, setShowUploadButton] = useState(false)

    const handleAddMessage = async( message: Messages, image: any = null ) => {
        let arr = messages;
        arr.push(message)
        setMessages([...arr])

        if( message.error ) return;

        if( image ){
            await handleSendMultimedia(message.message, image)
        }else{
            await handleSend(message.message)
        }
        
    }

    const handleSend = async( prompt : string ) => {
        const result = await modelTextOnly.generateContentStream(prompt);

        let text = '';
        let arr = messages;
        let newMessage : Messages = {
            role: authorType.BOT,
            message: '',
            error: false,
            date: new Date()
        }
        arr.push(newMessage)
        setMessages([...arr])
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
            arr[arr.length-1].message = text;
            setMessages([...arr])
        }
    }

    const handleSendMultimedia = async( prompt : string, image: any ) => {
        const result = await modelMultimedia.generateContentStream([prompt, ...image]);

        let text = '';
        let arr = messages;
        let newMessage : Messages = {
            role: authorType.BOT,
            message: '',
            error: false,
            date: new Date()
        }

        arr.push(newMessage)
        setMessages([...arr])

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
            arr[arr.length-1].message = text;
            setMessages([...arr])
        }
    }

    const getFileExtension = ( name : string) => {
        return name
        .substring(name.lastIndexOf("."))
        .replace('.','')
        .toLowerCase()
    }

    const handleErrorFile = () => {
        setShowUploadButton(!showUploadButton)
        let newMessage : Messages = {
            role: authorType.USER,
            message: '',
            error: true,
            date: new Date(),
        }
        handleAddMessage(newMessage)
        console.log('creando error')
    }
  
    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => { 
        if( event.target.files != undefined && event.target.files?.length > 0 ){
            if (!validateDocFile(event.target.files)) {
                handleErrorFile()
                return;
            }else{
                let errorIndex = messages.find(( item ) => item.error == true )
                if ( errorIndex != undefined ){
                    let arr = messages.filter(( item ) => !item.error )
                    setMessages([...arr])
                }
            }
            if(showUploadButton) setShowUploadButton(!showUploadButton)
            setFile([event.target.files[0]])
            console.log(event.target.files[0],'file')
            setPreviewFile(URL.createObjectURL(event.target.files[0]))
            let filetype = getFileExtension(event.target.files[0].name)
            setFileExtension(filetype)
        }   
    }

    const handleDropFile = (selectedFile: FileList) => {
        if (selectedFile && selectedFile.length > 0) {
            if (!validateDocFile(selectedFile)) {
                handleErrorFile()
                return;
            }
            if(showUploadButton) setShowUploadButton(!showUploadButton)
            const fileList: any = selectedFile[0];
            setFile(fileList);
            setPreviewFile(URL.createObjectURL(fileList))
            let filetype = getFileExtension(fileList.name)
            setFileExtension(filetype)
        }
    }

    useEffect(() => {
        if( messages.length < 1 ){
            let arr = messages;
            arr.push(defaultBotMessage)
            setMessages([...arr])
        }
    },[])

    useEffect(() => {
    },[messages])

    return (
        <div className={style.main}>
            <div className={style.chatBotHeader}>
                <div className={style.chatBotHeaderIconContainer}>
                    <Image
                        priority
                        src='/chatBubble.svg'
                        alt="Vercel Logo"
                        width={100}
                        height={24}
                    />
                </div>  
                <div className={style.chatBotHeaderTextContainer}>
                    <p>Chat<span>Bot</span></p>
                </div>
            </div>
            <ChatboxBody 
                type={type} 
                messages={messages}
                handleChangeFile={handleChangeFile} 
            />
            <ChatboxFooter
                addMessage={ handleAddMessage }
                handleChangeFile={ handleChangeFile }
                handleDropFile={ handleDropFile }
                previewFile={ previewFile }
                setPreviewFile={ setPreviewFile }
                fileExtension={ fileExtension }
                setFileExtension={ setFileExtension }
                showUploadButton={ showUploadButton }
                setShowUploadButton={ setShowUploadButton }
                fileData={ file }
                setFile={ setFile }
            />
                
        </div>
    )
}