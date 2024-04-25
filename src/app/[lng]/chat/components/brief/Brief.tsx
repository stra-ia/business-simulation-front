"use client";
import React, { useEffect, useState } from "react";
import style from "./Brief.module.css";
import BriefBody from "./BriefBody";
import { useAtomValue } from "jotai";
import { typeArea } from "@/atoms/type";

export default function Brief() {

  const type: any = useAtomValue(typeArea);

  return (
    <div className={style.main}>
      <div className={style.briefHeader}>
        <div className={style.briefHeaderTextContainer}>
          <p>
            <span>{ type } </span>Brief
          </p>
        </div>
      </div>
      <BriefBody />
    </div>
  );
}
