import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, authorType } from './utils/enums'
import Image from 'next/image';
interface ChatboxFooterProps {
    addMessage: HandleAdd
}

export default function ChatboxFooter({ addMessage } : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any[]>([])
    const handleChangeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
            setMessage(e.target.value)
    }

    const handleCreateMessage = async() => {
        if( !message || message.length < 1 ){
            return;
        }
        if( file == null || file == undefined ) {
            let newMessage = {
                role: authorType.USER,
                message: message,
                date: new Date()
            }
            addMessage(newMessage)
            setMessage('')
        } 
       else{
        console.log('aca??',file)
        const imageParts = await Promise.all(
            file.map(fileToGenerativePart)
          );
        console.log(imageParts,'parts')
       }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateMessage()
        }
    };

    const fileToGenerativePart = async(file: any) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader = new FileReader();
          console.log('reader',reader)
          if ( reader && reader.result != null){
            reader.onloadend = () => resolve(reader.result?.split(',')[1]);
            reader.readAsDataURL(file);
          }
          console.log('hasta acaaaaa')
        });

        return {
          inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => { 
        console.log(event.target.files,'files')
        if( event.target.files != undefined && event.target.files?.length > 0 ){
            setFile([event.target.files])
        }
        
    }

    return (
        <div className={style.footer}>
            <button 
                className={style.button} 
                name='attach' 
                type='button'
                onClick={event => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                }}
            >        
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
                type="file" 
                hidden
                onChange={handleChangeFile}
                ref={fileInputRef} 
            />
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