import React from 'react'
import style from './ChatboxBody.module.css'

interface ChatboxBodyProps {
    messages: any[];
}

export default function ChatboxBody( {messages} : ChatboxBodyProps ) {
    
    return (
        <>
        <hr className={style.hr} />
            <div className={style.body}>  
                <div className={style.messageForMe}>
                    <p>Hello! How can I help you?</p>
                </div>
                <div className={style.messageByMe}>
                    <p>Hi, I need your help</p>
                </div>
            </div>
        </>
    )
}