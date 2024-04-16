"use client";
import React, { useEffect, useState } from 'react'
import style from './Chatbox.module.css'
import ChatboxBody from './ChatboxBody'
import ChatboxFooter from './ChatboxFooter';
import { Messages, authorType } from './utils/enums';

const defaultBotMessage = {
    role: authorType.BOT,
    message: 'Hello! How can I help you?',
    date: new Date(),
}

export default function Chatbox() {

    const [messages, setMessages] = useState<Messages[]>([])
    const [reload, setReload] = useState(false);

    const handleAddMessage = ( message: Messages ) => {
        let arr = messages;
        arr.push(message)
        setMessages([...arr])
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