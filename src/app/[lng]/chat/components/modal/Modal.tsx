'use client'
import React from 'react'
import style from './Modal.module.css'
import Image from 'next/image'
import ModalResultCard from './ModalResultCard'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useAtomValue } from 'jotai'
import { predictionAtom } from '@/atoms/chatBot'

interface modal {
  onClose: any
  results: {
    ad: {
      title: string
      description: string
      image: string
    }
    metrics: {
      investment: {
        total: string | number
        title: string
      }
      gathered: {
        total: string | number
        title: string
      }
      score: {
        total: string | number
        title: string
      }
    }
  }
}
export default function Modal({ onClose, results }: modal) {
  //reemplazar result por props

  const { lng } = useParams()
  const { t } = useTranslation(lng, 'modal')
  const prediction = useAtomValue(predictionAtom)

  console.log('prediction', prediction)

  return (
    <div className={style.modal}>
      <div className={style.modalContainer}>
        <div className={style.modalContent}>
          <div className={style.modalHeader}>
            <span onClick={onClose} className={style.close}>
              &times;
            </span>
            <h2 className={style.simulationName}>
              Simulador del impacto de la publicación
            </h2>
            <hr className={style.hr} />
          </div>
          {prediction && (
            <div className={style.modalBody}>
              <div className={style.results}>
                <ModalResultCard
                  title={results.metrics.investment.title}
                  number={Math.round(
                    prediction.user_input_impressions_over_spend
                  )}
                  icon="dollar"
                />
                <ModalResultCard
                  title={results.metrics.gathered.title}
                  number={prediction?.total_impressions}
                  icon="metrics"
                />
                <ModalResultCard
                  title={results.metrics.score.title}
                  number={prediction?.categorical_score}
                  // icon="metrics"
                />
              </div>
            </div>
          )}

          <div className={style.modalFooter}>
            <button className={style.modalFooterButton} onClick={onClose}>
              <p>{t(`button`)}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
