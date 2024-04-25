import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
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

    const isSameGroup = ( current: authorType, previous: authorType  ) => {
        console.log(current, previous,'ojo')
        return current == previous ? true : false;
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
                                    /// model bubble [start] ///
                                    item.role == authorType.BOT &&
                                    <div 
                                        key={i} 
                                        className={`${style.messageContainer} 
                                        ${ isSameGroup(item.role, messages[i-1]?.role) ? style.sameGroup : ''  }`}>
                                            <div className={style.iconContainer}>
                                                <Image
                                                    priority
                                                    src='/robot.svg'
                                                    alt="robot icon"
                                                    width={100}
                                                    height={24}
                                                    className={style.iconRobot }
                                                />
                                            </div>
                                            <div key={i} className={ style.messageForMe }>
                                                <Markdown>{item.message}</Markdown>
                                            </div>
                                    </div>
                                    /// model bubble [end] ///
                                }
                                {
                                    /// user bubble [start] ///
                                    (item.role == authorType.USER && !item.error ) &&
                                    <>
                                        <div  key={i} 
                                              className={`${style.messageByMe }
                                              ${ isSameGroup(item.role, messages[i-1]?.role) ? style.sameGroup : ''  }`}>
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
                                    /// user bubble [end] ///
                                }
                                {
                                    /// file error bubble [start] ///
                                    item.error &&
                                    <div key={i} className={ style.errorFile }>
                                        <FileError handleChangeFile={handleChangeFile} />
                                    </div>
                                    /// file error bubble [end] ///
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