"use client";
import React, { useEffect, useState } from 'react'
import style from './Chatbox.module.css'
import ChatboxBody from './ChatboxBody'
import ChatboxFooter from './ChatboxFooter';
import { Messages, authorType } from './utils/enums';
import { GoogleGenerativeAI } from '@google/generative-ai';

const defaultBotMessage = {
    role: authorType.BOT,
    message: 'Hello! How can I help you?',
    date: new Date(),
}

export default function Chatbox() {

    const [messages, setMessages] = useState<Messages[]>([])
    const [reload, setReload] = useState(false);
    const genAI = new GoogleGenerativeAI('AIzaSyAszMvafUVl4PJq0XNAm6obfCAe3KF13t4');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const handleAddMessage = async( message: Messages ) => {
        let arr = messages;
        arr.push(message)
        setMessages([...arr])
        let response = await handleSendGemini(message.message)
        // let newMessage = {
        //     role: authorType.BOT,
        //     message: response,
        //     date: new Date()
        // }
        // arr.push(newMessage)
        // setMessages([...arr])
    }

    const handleSendGemini = async( prompt : string ) => {
        const result = await model.generateContentStream(prompt);
        // const response = await result.response;

        let text = '';
        let arr = messages;
        let newMessage = {
            role: authorType.BOT,
            message: '',
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
                <p>Chat<span>Bot</span></p>
            </div>
            <ChatboxBody messages={messages} />
            <ChatboxFooter addMessage={ handleAddMessage } />
        </div>
    )
}