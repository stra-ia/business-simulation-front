"use client";
import React from "react";
import style from "./ModalResultCard.module.css";
import Image from "next/image";

interface ModalResultCard {
  title: string,
  number: string | number,
  icon: string
}
export default function ModalResultCard({ title, number, icon } : ModalResultCard) {

  const result = {
    ad: {
      title: 'Running style life',
      description: 'El running transmite la emoción y la liberación de correr, destacando la fuerza, la determinación y los logros personales. Promueve productos relacionados con el running y alienta un estilo de vida activo y saludable.',
      image: 'https://img.freepik.com/free-vector/drink-ad-nature-watermelon-juice_52683-34242.jpg' 
    },
    metrics: {
      total_investment: '55 mil',
      total_gathered: '120'
    }
  }

  return (
    <div className={style.modalBodyResultsContainer}>
        <div className={style.modalBodyResult}>
            <div className={style.modalBodyResultHeader}>
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
                <div className={style.modalBodyResutNumberContainer}>
                    <h2 className={style.modalBodyResutNumber}>{number}</h2>
                </div>
            </div>
            <p className={style.modalBodyResutTitle}>{title}</p>
        </div>
    </div>
  );
}
