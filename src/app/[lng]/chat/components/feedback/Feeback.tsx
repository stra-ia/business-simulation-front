'use client'
import React, { useState } from 'react'
import style from './Feedback.module.css'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { useAtomValue } from 'jotai'
import { feedbackAtom, isLoadingFeedbackAtom } from '@/atoms/chatBot'

interface Points {
  title: string
  description: string
}

interface Feedback {
  title: string
  points: Points[]
}

export default function Feedback(/* feedback : Feedback */) {
  const { lng } = useParams()
  const { t } = useTranslation(lng, 'feedback')
  const feedback = useAtomValue(feedbackAtom)
  const isLoading = useAtomValue(isLoadingFeedbackAtom)

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
        {isLoading ? (
          <div className={style.loading}>
            <p>Loading...</p>
          </div>
        ) : (
          feedback && (
            <div className={style.overview}>
              <Markdown>{feedback}</Markdown>
            </div>
          )
        )}
      </div>
      <div className={style.footer}>
        <button className={style.buttonRegenerate}>
          <p>{t(`buttons.regenerate`)}</p>
        </button>
      </div>
    </div>
  )
}
