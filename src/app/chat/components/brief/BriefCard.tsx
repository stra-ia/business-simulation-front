"use client";
import React, { useEffect, useState } from 'react'
import style from './BriefCard.module.css'
import Image from 'next/image';

interface itemCard {
    isDone: boolean,
    title: string,
    desc: string
}

export default function BriefCard( item : itemCard ) {
    const {  isDone, title, desc } = item;

    return (
        <div className={style.card} >
            <div className={style.cardIconContainer}>
                <Image
                    priority
                    className={ isDone ? `${style.cardIconDone}` : `${style.cardIcon}`}
                    src={ isDone ? '/checkGreen.svg' : '/checkDefault.svg'}
                    alt="Check icon"
                    height={24}
                    width={50}
                />
            </div>
            <div className={style.cardDetailsContainer}>
                <p className={ isDone ? `${style.cardTitleDone}` : `${style.cardTitle}`}>{title}</p>
                <p className={ isDone ?  `${style.cardDescriptionDone}` : `${style.cardDescription}`}>{desc}</p>
            </div> 
        </div>
)
}