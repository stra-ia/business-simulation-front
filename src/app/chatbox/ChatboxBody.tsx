import React, { useEffect, useMemo } from 'react'
import style from './ChatboxBody.module.css'
import { Messages, authorType } from './utils/enums';

interface ChatboxBodyProps {
    messages: Messages[];
}

export default function ChatboxBody( {messages} : ChatboxBodyProps ) {
    
useEffect(() => {},[])
useEffect(() => {},[messages])

    function groupMessagesByDateAndSender(messages: any) {
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

    console.log(groups,'groups')

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
                                <div key={i} className={ item.role == authorType.BOT ? style.messageForMe : style.messageByMe }>
                                    {item.message}
                                </div>
                            )) 
                        }
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}