import React from 'react'
import ChatBox from '../chatbox/Chatbox'
import style from './page.module.css'

export default function Page() {
    return (
        <div className={ style.main } >
            <h3>Chat page</h3>
            <ChatBox />
        </div>
    )
}