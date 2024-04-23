import React from 'react'
import ChatBox from '../chatbox/Chatbox'
import style from './page.module.css'
import Brief from '../brief/Brief'

export default function Page() {
    return (
        <div className={ style.main } >
            <ChatBox />
            <Brief />
        </div>
    )
}