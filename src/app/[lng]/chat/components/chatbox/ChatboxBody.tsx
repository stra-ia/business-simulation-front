import React, { ChangeEvent, useEffect, useMemo, useRef } from 'react'
import style from './ChatboxBody.module.css'
import { AreaType, Messages, authorType } from './utils/enums';
import Image from 'next/image';
import Markdown from 'react-markdown';
import FileError from './FileError';


interface ChatboxBodyProps {
    messages: Messages[];
    type: AreaType;
    handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function ChatboxBody( {messages, type, handleChangeFile} : ChatboxBodyProps ) {

    const bodyRef = useRef<HTMLDivElement>(null);
    useEffect(() => {},[])
    useEffect(() => {},[messages])
    useEffect(() => {
        bodyRef.current?.lastElementChild?.scrollIntoView()
        if( messages.length > 1 )
        console.log(messages[1].file?.fileData.name,'messages')
    }, [messages]);
    

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
        {
            type == AreaType.MARKETING && 
            (
                <div className={style.briefDisclaimer}>
                    <span>
                        Definiendo Brief. Puedes iniciar la conversación para construir tu campaña.
                    </span>
                </div>
            )
        } 
        <hr className={style.hr} />
            <div ref={bodyRef} className={style.body}>  
                {
                    groups.map(([date, messagesGroups], index) => (
                        <React.Fragment key={index}>
                            <span className={ style.dateSpan }>{date}</span>
                        {
                            messagesGroups.length > 0 && messages.map(( item, i ) => (
                                <>
                                {
                                    item.role == authorType.BOT &&
                                    <div key={i} className={style.messageContainer}>
                                    
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
                                            <Markdown>{item.message}</Markdown>
                                        </div>
                                    </div>
                                }
                                {
                                    (item.role == authorType.USER && !item.error ) &&
                                    <>
                                        <div key={i} className={ style.messageByMe }>
                                            {item.message}
                                        </div>
                                        {
                                            (item.file && item.file.fileData && item.file.fileType == 'pdf')  && 
                                                <div key={i} className={ style.fileByMe }>
                                                    <iframe 
                                                        style={{"overflow":"hidden;"}}
                                                        className={style.file}
                                                        src={`${item.file.fileURL}`}
                                                    >    
                                                    </iframe>        
                                                </div>
                                        }
                                        {
                                            (item.file && item.file.fileData && item.file.fileType != 'pdf' ) && 
                                            <div key={i} className={ style.fileByMe}>
                                                {
                                                    item.file?.fileData.name
                                                }             
                                            </div>
                                        }
                                    </>
                                }
                                {
                                    item.error &&
                                    <div key={i} className={ style.errorFile }>
                                        <FileError handleChangeFile={handleChangeFile} />
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