"use client";
import React, { useEffect, useState } from "react";
import style from "./CardHome.module.css";
import CardHomeSection from "./CardHomeSection";
import { cardHomePoints } from "./utils/enums";

export default function CardHome() {

  return (
    
    <div className={style.main}>
        {
            cardHomePoints.map((item, index) => (
                <CardHomeSection key={index} item={item} />
            ))
        }
        
    </div>
  );
}
