import React, { useEffect } from 'react'
import style from './ChatboxBody.module.css'
import { Messages, authorType } from './utils/enums';

interface ChatboxBodyProps {
    messages: Messages[];
}

export default function ChatboxBody( {messages} : ChatboxBodyProps ) {
    
useEffect(() => {},[])
useEffect(() => {},[messages])

    return (
        <>
        <hr className={style.hr} />
            <div className={style.body}>  
                {
                    messages.length > 0 && messages.map(( item, index ) => (
                        <div key={index} className={ item.role == authorType.BOT ? style.messageForMe : style.messageByMe }>
                            {item.message}
                        </div>
                    )) 
                }
            </div>
        </>
    )
}