import React, { useEffect, useMemo, useRef } from "react";
import style from "./BriefBody.module.css";
import BriefCard from "./BriefCard";
import BriefResume from "./BriefResume";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useAtomValue } from "jotai";
import { BriefPoints, briefPoints } from "@/atoms/briefPoints";

export default function BriefBody() {
  const { lng } = useParams();
  const { t } = useTranslation(lng, "salesBrief");
  const campaignDone = false;
  const themes: any = useAtomValue(briefPoints);

  return (
    <>
      <hr className={style.hr} />
      <div className={style.body}>
        {campaignDone ? (
          <BriefResume />
        ) : (
          <div className={style.cardsContainer}>
            {themes.length > 0 &&
              themes.map((item : BriefPoints, index: any) => <BriefCard key={index} {...item} />)}
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
          <p>{t(`buttons.closeCampaign`)}</p>
        </button>
      </div>
    </>
  );
}
