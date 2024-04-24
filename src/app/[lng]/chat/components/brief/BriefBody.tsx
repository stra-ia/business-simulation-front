import React, { useEffect, useMemo, useRef } from "react";
import style from "./BriefBody.module.css";
import BriefCard from "./BriefCard";
import BriefResume from "./BriefResume";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export default function BriefBody() {
  const { lng } = useParams();
  const { t } = useTranslation(lng, "chatbox");
  const campaignDone = false;
  const themes = [
    {
      isDone: true,
      id: "goals",
    },
    {
      isDone: false,
      id: "productOrService",
    },
    {
      isDone: false,
      id: "targetMarket",
    },
    {
      isDone: false,
      id: "strategy",
    },
    {
      isDone: false,
      id: "toole",
    },
    {
      isDone: false,
      id: "kpis",
    },
  ];

  return (
    <>
      <hr className={style.hr} />
      <div className={style.body}>
        {campaignDone ? (
          <BriefResume />
        ) : (
          <div className={style.cardsContainer}>
            {themes.length > 0 &&
              themes.map((item, index) => <BriefCard key={index} {...item} />)}
          </div>
        )}
      </div>
      <div className={style.briefFooter}>
        <button
          className={
            campaignDone
              ? `${style.closeCampaignButtonActive}`
              : `${style.closeCampaignButton}`
          }
        >
          <p>Cerrar campaña</p>
        </button>
      </div>
    </>
  );
}
