import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, authorType } from './utils/enums'
interface ChatboxFooterProps {
    addMessage: HandleAdd
}

export default function ChatboxFooter({ addMessage } : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');

    const handleChangeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
            setMessage(e.target.value)
    }

    const handleCreateMessage = () => {
        let newMessage = {
            role: authorType.USER,
            message: message,
            date: new Date()
        }
        addMessage(newMessage)
        setMessage('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateMessage()
        }
    };

    return (
        <div className={style.footer}>
            <button className={style.button} name='button' type='button' >Boton</button>
            <input value={message} onKeyDown={handleKeyDown}  onChange={handleChangeMessage} type="text" />
            <button className={style.button}  onClick={handleCreateMessage} name='button' type='button' >Boton</button>
        </div>
    )
}