import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, Messages, authorType, fileType } from './utils/enums';
import Image from 'next/image';
import { validateDocFile, validateImageFile } from './utils/validations';

interface ChatboxFooterProps {
    addMessage: HandleAdd,
    handleChangeFile: any,
    handleDropFile: any,
    fileData: any,
    setFile: any,
    previewFile: any,
    setPreviewFile: any,
    fileExtension : any,
    setFileExtension: any,
    showUploadButton: any,
    setShowUploadButton: any
}

export default function ChatboxFooter({ 
    addMessage, 
    handleChangeFile, 
    handleDropFile, 
    previewFile, 
    setPreviewFile,
    fileExtension,
    setFileExtension,
    showUploadButton,
    setShowUploadButton,
    fileData,
    setFile
} : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if( !previewFile ) {
            let newMessage : Messages = {
                role: authorType.USER,
                message: message,
                error: false,
                date: new Date(),
            }
            addMessage(newMessage)
            setMessage('')
        } 
       else{
        // const imageParts = await Promise.all(
        //     file.map(fileToGenerativePart)
        //   );
            let newMessage : Messages = {
                role: authorType.USER,
                message: message,
                file: {
                    fileURL: previewFile,
                    fileData: fileData[0],
                    fileType: fileExtension
                },
                error: false,
                date: new Date()
        }
        console.log(newMessage,'newMessage')
        // addMessage(newMessage, imageParts)
        addMessage(newMessage)
        setMessage('')
        setPreviewFile('')
        setFileExtension('')
        setFile([])
       }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateMessage()
        }
    };
  

    useEffect(() => {
    },[fileExtension])


    return (
        <div className={style.footer}>
            {
                showUploadButton && 
                <div className={style.fileContainer}>
                    <div
                        className={style.form__files}
                        onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
                            event.preventDefault();
                        }}
                        onDrop={(event: React.DragEvent<HTMLDivElement>) => {
                            event.preventDefault();
                            if (
                                event.dataTransfer &&
                                event.dataTransfer.files &&
                                event.dataTransfer.files.length > 0
                            ) {
                                const fileList: any = Array.from(
                                    event.dataTransfer.files,
                                );
                                handleDropFile(fileList);
                            }
                        }}
                        onClick={event => {
                            if (fileInputRef.current) {
                                fileInputRef.current.click();
                            }
                        }}
                        draggable={true}
                    >   
                        <Image
                            priority
                            src='/upload.svg'
                            height={20}
                            width={30}
                            className={style.iconUpload }
                            alt="Upload image"
                        />
                        <h3>
                            Drag and dop file XLS or PDF here
                        </h3>
                        <h3>or</h3>
                        <button className={style.uploadButton}>
                            <p>Browse file</p>
                        </button>
                        <input 
                            type="file" 
                            onChange={handleChangeFile}
                            ref={fileInputRef} 
                            hidden
                        />
                    </div>
                </div>
            }
            <div className={style.footerButtons}>
            <button 
                className={style.button} 
                name='attach' 
                type='button'
                onClick={
                    () => setShowUploadButton(!showUploadButton)
                }
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
        </div>
    )
}