"use client";
import React, { useEffect, useState } from "react";
import style from "./BriefCard.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

interface itemCard {
  isDone: boolean;
  id: string;
}

export default function BriefCard(item: itemCard) {
  const { lng } = useParams();
  const { t } = useTranslation(lng, "salesBrief");
  const { isDone, id } = item;

  return (
    <div className={style.card}>
      <div className={style.cardIconContainer}>
        <Image
          priority
          className={isDone ? `${style.cardIconDone}` : `${style.cardIcon}`}
          src={isDone ? "/checkGreen.svg" : "/checkDefault.svg"}
          alt="Check icon"
          height={24}
          width={50}
        />
      </div>
      <div className={style.cardDetailsContainer}>
        <p className={isDone ? `${style.cardTitleDone}` : `${style.cardTitle}`}>
          {t(`SalesBriefs.${id}.title`)}
        </p>
        <p
          className={
            isDone ? `${style.cardDescriptionDone}` : `${style.cardDescription}`
          }
        >
          {t(`SalesBriefs.${id}.description`)}
        </p>
      </div>
    </div>
  );
}
