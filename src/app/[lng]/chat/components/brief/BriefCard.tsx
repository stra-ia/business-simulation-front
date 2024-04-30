'use client'
import React, { useEffect, useState } from 'react'
import style from './BriefCard.module.css'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

interface itemCard {
  isField: boolean
  type: string
}

export default function BriefCard(item: itemCard) {
  const { lng } = useParams()
  const { t } = useTranslation(lng, 'salesBrief')
  const { isField, type } = item

  return (
    <div className={style.card}>
      <div className={style.cardIconContainer}>
        <Image
          priority
          className={isField ? `${style.cardIconDone}` : `${style.cardIcon}`}
          src={isField ? '/checkGreen.svg' : '/checkDefault.svg'}
          alt="Check icon"
          height={24}
          width={50}
        />
      </div>
      <div className={style.cardDetailsContainer}>
        <p
          className={isField ? `${style.cardTitleDone}` : `${style.cardTitle}`}
        >
          {t(`SalesBriefs.${type}.title`)}
        </p>
        <p
          className={
            isField
              ? `${style.cardDescriptionDone}`
              : `${style.cardDescription}`
          }
        >
          {t(`SalesBriefs.${type}.description`)}
        </p>
      </div>
    </div>
  )
}
