import React, { useEffect, useMemo, useRef } from 'react'
import style from './BriefBody.module.css'
import BriefCard from './BriefCard'
import BriefResume from './BriefResume';

export default function BriefBody() {

    const campaignDone = false;
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
        <>
            <hr className={style.hr} />
            <div className={style.body}> 
                {
                    campaignDone ? 
                    <BriefResume/>
                    : 
                    <div className={style.cardsContainer}>
                    {
                        themes.length > 0  &&  themes.map(( item, index ) => (
                            <BriefCard key={index} {...item} />
                        ))
                    }
                    </div>
                }
            </div>
            <div className={style.briefFooter}>
                <button className={ campaignDone ? `${style.closeCampaignButtonActive}` : `${style.closeCampaignButton}`}>
                    <p>Cerrar campaña</p>
                </button>
            </div>
        </>
    )
}