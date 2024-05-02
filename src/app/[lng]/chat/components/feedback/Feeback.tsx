"use client";
import React, { useState } from "react";
import style from "./Feedback.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";

interface Points {
    title: string,
    description: string
}

interface Feedback {
    title: string,
    points: Points[]
}

export default function Feedback( /* feedback : Feedback */ ) {
  //reemplazar result por props

  const { lng } = useParams()
  const { t } = useTranslation(lng, 'feedback')
  const [isReady, setIsReady] = useState(false)

  return (
    <div className={style.feedback}>
        <div className={style.body}>
            <div className={style.header}>
                <div className={style.headerImage}>
                    <Image
                        priority
                        src="/comment-info.svg"
                        height={24}
                        width={30}
                        alt="comment Logo"
                    />
                </div>
                <div className={style.headerTitle}>
                    <h3>Feedback</h3>
                </div>
            </div>
            <div className={style.score}>
            
            </div>
            <div className={style.overview}>

            </div>
        </div>
        <div className={style.footer}>
            <button disabled={!isReady} className={ isReady ? style.buttonRegenerate : style.buttonRegenerateInactive}>
                <p>{t(`buttons.regenerate`)}</p>
            </button>
            <button disabled={!isReady} className={ isReady ? style.buttonSave : style.buttonSaveInactive }>
                <p>{t(`buttons.saveResults`)}</p>
            </button>
        </div>
    </div>
  );
}
