import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, authorType } from './utils/enums'
import Image from 'next/image';
interface ChatboxFooterProps {
    addMessage: HandleAdd
}

export default function ChatboxFooter({ addMessage } : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');

    const handleChangeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
            setMessage(e.target.value)
    }

    const handleCreateMessage = () => {
        if( !message || message.length < 1 ){
            return;
        }
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


    async function fileToGenerativePart(file: any) {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader = new FileReader();
          if ( reader && reader.result != null){
            reader.onloadend = () => resolve(reader.result?.split(',')[1]);
            reader.readAsDataURL(file);
          }
        });

        return {
          inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div className={style.footer}>
            <button className={style.button} name='button' type='button'>
                <Image
                    priority
                    src='/clip.svg'
                    alt="Attach image"
                    width={15}
                    height={15}
                    className={style.iconFooter }
                />
            </button>
            <input 
                className={style.input} 
                placeholder='Write something...' 
                value={message} 
                onKeyDown={handleKeyDown}  
                onChange={handleChangeMessage} 
                type="text" />
            <button 
                className={style.button}  
                onClick={handleCreateMessage} 
                name='button' 
                type='button'>
                <Image
                    priority
                    src='/paper-plane.svg'
                    alt="Send"
                    width={15}
                    height={15}
                    className={style.iconFooter }
                />
            </button>
            <button 
                className={style.buttonVoice}  
                name='button' 
                type='button'>
                <Image
                    priority
                    src='/microphone.svg'
                    alt="Voice"
                    width={15}
                    height={15}
                    className={style.iconFooter }
                />
            </button>
        </div>
    )
}