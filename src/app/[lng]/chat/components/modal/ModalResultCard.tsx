'use client'
import React from 'react'
import style from './ModalResultCard.module.css'
import Image from 'next/image'

interface ModalResultCard {
  title: string
  number: string | number
  icon?: string
}
export default function ModalResultCard({
  title,
  number,
  icon
}: ModalResultCard) {
  return (
    <div className={style.modalBodyResultsContainer}>
      <div className={style.modalBodyResult}>
        <div className={style.modalBodyResultHeader}>
          {icon && (
            <div className={style.modalBodyResultsImageContainer}>
              <Image
                priority
                className={style.modalResultsImage}
                src={`/${icon}.svg`}
                alt={`${icon}`}
                height={20}
                width={20}
              />
            </div>
          )}
          <div className={style.modalBodyResutNumberContainer}>
            <h2 className={style.modalBodyResutNumber}>{number}</h2>
          </div>
        </div>
        <p className={style.modalBodyResutTitle}>{title}</p>
      </div>
    </div>
  )
}
