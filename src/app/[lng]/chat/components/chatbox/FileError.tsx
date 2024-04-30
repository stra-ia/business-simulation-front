import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import style from './FileError.module.css'
import Image from 'next/image';

interface FileErrorProps {
    handleChangeFile: any,
}

export default function FileError({ handleChangeFile } : FileErrorProps ) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
                <div className={style.fileErrorContainer }>
                    <div className={style.errorBody}>
                        <Image
                            priority
                            src='/uploadError.svg'
                            height={20}
                            width={30}
                            className={style.iconUpload }
                            alt="Upload image"
                        />
                        <p>Error en la carga del archivo</p>
                        <span>Formato PDF o XLS con tamaño máximo de 10 mb</span>
                    </div>
                    <div className={style.errorFooter}>
                        <button 
                            className={style.errorFooterUploadButton}
                            onClick={event => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.click();
                                }
                            }}>
                            <p>Browse file</p>
                        </button>
                        <input 
                            type="file" 
                            onChange={handleChangeFile}
                            hidden
                            ref={fileInputRef}
                        />
                    </div>
                </div>
           
    )
}