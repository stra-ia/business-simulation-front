import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, authorType } from './utils/enums';
import Image from 'next/image';
import { validateImageFile } from './utils/validations';
interface ChatboxFooterProps {
    addMessage: HandleAdd,
}

export default function ChatboxFooter({ addMessage } : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any[]>([])
    const [previewFile, setPreviewFile] = useState('')
    const handleChangeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
            setMessage(e.target.value)
    }

    const fileToGenerativePart = async(item: any) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader = new FileReader();
          if ( reader ){
            reader.onloadend = () => resolve(reader.result?.split(',')[1]);
            reader.readAsDataURL(item);
          }
          
        });
        let data = await base64EncodedDataPromise
        return {
            inlineData: { 
                data, 
                mimeType: item.type 
            },
        };
    }


    const handleCreateMessage = async() => {
        if( !message || message.length < 1 ){
            return;
        }
        if( file == null || file == undefined || file.length < 1) {
            let newMessage = {
                role: authorType.USER,
                message: message,
                date: new Date()
            }
            addMessage(newMessage)
            setMessage('')
        } 
       else{
        const imageParts = await Promise.all(
            file.map(fileToGenerativePart)
          );
        let newMessage = {
            role: authorType.USER,
            message: message,
            image: previewFile,
            date: new Date()
        }
        addMessage(newMessage, imageParts)
        setMessage('')
        setPreviewFile('')
       }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateMessage()
        }
    };

  
    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => { 
        if( event.target.files != undefined && event.target.files?.length > 0 ){
            if (!validateImageFile(event.target.files)) {
                console.log('not valid format')
                return;
            }
            setFile([event.target.files[0]])
            setPreviewFile(URL.createObjectURL(event.target.files[0]))
        }   
    }

    useEffect(() => {
    },[file])


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