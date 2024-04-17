import React, { useEffect, useMemo } from 'react'
import style from './ChatboxBody.module.css'
import { Messages, authorType } from './utils/enums';
import Image from 'next/image';

interface ChatboxBodyProps {
    messages: Messages[];
}

export default function ChatboxBody( {messages} : ChatboxBodyProps ) {
    
useEffect(() => {},[])
useEffect(() => {},[messages])

    const groupMessagesByDateAndSender = (messages: any) => {
        return messages.reduce((groups: any, message: any) => {
            const dayWeek = message.date.toLocaleDateString('en-US', { weekday: "long" });  
            const dayMonth = message.date.getDate(); 
            const monthName = message.date.toLocaleDateString('en-US', { month: "long" }); 
            const formattedDate = `${dayWeek}, ${dayMonth} ${monthName}`;

            if (!groups[formattedDate]) {
                groups[formattedDate] = [];
            }
            groups[formattedDate].push([message]);
            return groups
        }, {});
    }

    const groups = useMemo(
        () => Object.entries(groupMessagesByDateAndSender(messages)),
    [messages],
    );

    return (
        <>
        <hr className={style.hr} />
            <div className={style.body}>  
                {
                    groups.map(([date, messagesGroups], index) => (
                        <React.Fragment key={index}>
                            <span className={ style.dateSpan }>{date}</span>
                        {
                            messagesGroups.length > 0 && messages.map(( item, i ) => (
                                <>
                                {
                                    item.role == authorType.BOT ?
                                    <div className={style.messageContainer}>
                                    
                                        <div className={style.iconContainer}>
                                            <Image
                                                priority
                                                src='/robot.svg'
                                                alt="Vercel Logo"
                                                width={100}
                                                height={24}
                                                className={style.iconRobot }
                                            />
                                        </div>
                                        <div key={i} className={ style.messageForMe }>
                                            {item.message}
                                        </div>
                                    </div>
                                    :
                                    <div key={i} className={ style.messageByMe }>
                                        {item.message}
                                    </div>
                                }
                                </>
                            )) 
                        }
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}