"use client";
import React from "react";
import style from "./Modal.module.css";
import Image from "next/image";
import ModalResultCard from "./ModalResultCard";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

interface modal {
  onClose: any,
  results: {
    ad: {
      title: string,
      description: string,
      image: string,
    },
    metrics: {
      investment: {
        total: string | number,
        title: string,
      },
      gathered: {
        total: string | number,
        title: string,
      }
    }
  }
  
}
export default function Modal( { onClose, results } : modal ) {
  //reemplazar result por props

  const { lng } = useParams()
  const { t } = useTranslation(lng, 'modal')

  return (
    <div className={style.modal}>
       <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <div className={style.modalHeader}>
                <span onClick={ onClose } className={style.close}>&times;</span>
                <h2 className={style.simulationName}>Simulador del impacto de la publicación</h2>
                <hr className={style.hr} />
            </div>
            
            <div className={style.modalBody}>
              <div className={style.modalBodyAd}>
                <h3 className={style.modalBodyAddTitle}>{ results.ad.title }</h3>
                <p className={style.modalBodyAddDescription}>{ results.ad.description } </p>
                <div className={style.modalBodyImageContainer}>
                  <Image
                    priority
                    className={style.modalBodyImage}
                    src={results.ad.image}
                    alt="add"
                    height={40}
                    width={50}
                  />
                </div>
              </div>
              <div className={style.results}>
                <ModalResultCard title={results.metrics.investment.title} number={results.metrics.investment.total} icon="dollar" />
                <ModalResultCard title={results.metrics.gathered.title} number={results.metrics.gathered.total} icon="metrics" />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.modalFooterButton}>
                <p>{t(`button`)}</p>
              </button>
            </div>
          </div>
       </div>
    </div>
  );
}
