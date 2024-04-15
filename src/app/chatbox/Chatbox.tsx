"use client";
import React, { useState } from 'react'
import style from './Chatbox.module.css'
import ChatboxBody from './ChatboxBody'
import ChatboxFooter from './ChatboxFooter';

interface Messages {
    author: string,
    message: string,
    date: string | Date
}

export default function Chatbox() {

    const [messages, setMessages] = useState<Messages[]>([])

    return (
        <div className={style.main}>
            <div className={style.chatBotHeader}>
                <p>Chat<span>Bot</span></p>
            </div>
            <ChatboxBody messages={messages} />
            <ChatboxFooter />
        </div>
    )
}