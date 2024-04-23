"use client";
import React, { useEffect, useState } from 'react'
import style from './BriefCard.module.css'
import Image from 'next/image';

export default function BriefCard() {

    const themes = [
        {
            isDone: true,
            title: 'Objetivos',
            desc: 'Define metas claras y medibles que el equipo'
        },
        {
            isDone: false,
            title: 'Producto/Servicio',
            desc: 'Breve descripción y ventajas.'
        },
        {
            isDone: false,
            title: 'Mercado Objetivo',
            desc: 'Perfil del cliente y necesidades.'
        },
        {
            isDone: false,
            title: 'Estrategias',
            desc: 'Principales métodos de venta.'
        },
        {
            isDone: false,
            title: 'Herramientas',
            desc: 'Recursos disponibles para el equipo.'
        },
        {
            isDone: false,
            title: 'KPIs',
            desc: 'Indicadores clave de rendimiento.'
        },
    ]

    return (
        <div className={style.cardsContainer}>
            {
                themes.length && themes.map(( item, index ) => (
                    <div key={index} className={style.card} >
                        <div className={style.cardIconContainer}>
                            <Image
                                className={ item.isDone ? `${style.cardIconDone}` : `${style.cardIcon}`}
                                priority
                                src={ item.isDone ? '/checkGreen.svg' : '/checkDefault.svg'}
                                alt="Check icon"
                                height={24}
                                width={50}
                            />
                        </div>
                        <div className={style.cardDetailsContainer}>
                            <p className={item.isDone ? `${style.cardTitleDone}` : `${style.cardTitle}`}>{item.title}</p>
                            <p className={ item.isDone ?  `${style.cardDescriptionDone}` : `${style.cardDescription}`}>{item.desc}</p>
                        </div> 
                    </div>
                ))
            }
            
        </div>
    )
}