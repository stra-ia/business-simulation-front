"use client";
import React, { useEffect, useState } from "react";
import style from "./Brief.module.css";
import BriefBody from "./BriefBody";

export default function Brief() {
  return (
    <div className={style.main}>
      <div className={style.briefHeader}>
        <div className={style.briefHeaderTextContainer}>
          <p>
            <span>Sales </span>Brief
          </p>
        </div>
      </div>
      <BriefBody />
    </div>
  );
}