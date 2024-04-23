import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './ChatboxFooter.module.css'
import { HandleAdd, authorType, fileType } from './utils/enums';
import Image from 'next/image';
import { validateDocFile, validateImageFile } from './utils/validations';
interface ChatboxFooterProps {
    addMessage: HandleAdd,
}

export default function ChatboxFooter({ addMessage } : ChatboxFooterProps ) {

    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any[]>([])
    const [fileExtension, setFileExtension] = useState('')
    const [previewFile, setPreviewFile] = useState('')
    const [showUploadButton, setShowUploadButton] = useState(false)

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
            let newMessage = {
                role: authorType.USER,
                message: message,
                date: new Date(),
            }
            addMessage(newMessage)
            setMessage('')
        } 
       else{
        // const imageParts = await Promise.all(
        //     file.map(fileToGenerativePart)
        //   );
            let newMessage = {
                role: authorType.USER,
                message: message,
                file: {
                    fileData:previewFile,
                    fileType: fileExtension
                },
                date: new Date()
        }
        console.log(newMessage,'newMessage')
        // addMessage(newMessage, imageParts)
        addMessage(newMessage)
        setMessage('')
        setPreviewFile('')
        setFileExtension('')
       }
    }

    const getFileExtension = ( name : string) => {
        return name
        .substring(name.lastIndexOf("."))
        .replace('.','')
        .toLowerCase()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateMessage()
        }
    };
  
    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => { 
        if( event.target.files != undefined && event.target.files?.length > 0 ){
            if (!validateDocFile(event.target.files)) {
                console.log('not valid format')
                return;
            }
            setFile([event.target.files[0]])
            console.log(event.target.files[0],'file')
            setPreviewFile(URL.createObjectURL(event.target.files[0]))
            let filetype = getFileExtension(event.target.files[0].name)
            setFileExtension(filetype)
        }   
    }

    const handleDropFile = (selectedFile: FileList) => {
        if (selectedFile && selectedFile.length > 0) {
            if (!validateDocFile(selectedFile)) {
                console.log('not valid format')
                return;
            }
            const fileList: any = selectedFile[0];
            setFile(fileList);
            setPreviewFile(URL.createObjectURL(fileList))
            let filetype = getFileExtension(fileList.name)
            setFileExtension(filetype)
        }
    }


    useEffect(() => {
    },[file])


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