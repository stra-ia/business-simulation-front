"use client";
import React, { useEffect, useState } from "react";
import style from "./CardHomeSection.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

interface CardHomePoints {
    item: any
}
  
export default function CardHomeSection({ item } : CardHomePoints ) {

    const { lng } = useParams();
    const { t } = useTranslation(lng, "cardHome");
    const { id } = item;

  return (
    <div className={style.card}>
      <div className={style.cardNumber}>{t(`CardHome.${id}.number`)}</div>
      <div className={style.cardDetailsContainer}>
        <p className={`${style.cardTitle}`}>{t(`CardHome.${id}.title`)}</p>
        <p className={`${style.cardDescription}`}> {t(`CardHome.${id}.description`)} </p>
      </div>
    </div>
  );
}
