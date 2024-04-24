"use client";
import React, { useEffect, useState } from 'react'
import style from './BriefResume.module.css'

interface briefResume {
    clientType: string,
    companySize: number,
    saleType?: string,
    campaignDuration: string,
    details: string
}

export default function BriefResume() {

    const resume : briefResume = {
        clientType: 'CEO',
        companySize: 40,
        saleType: 'Reunión closer',
        campaignDuration: '14 meses',
        details: 'Empresa especializada en el desarrollo de soluciones de software personalizadas para empresas, con un enfoque particular en soluciones de automatización para la industria de manufactura y logística. Además, la empresa ofrece consultoría en transformación digital y servicios de mantenimiento de sistemas.'
    }

    return (
            <div className={style.card} >
                <div className={style.resumeSection}>
                    <p className={style.resumeSectionTitle}>Tipo de cliente</p>
                    <p className={style.resumeSectionDescription}>{resume.clientType}</p>
                </div>
                <div className={style.resumeSection}>
                    <p className={style.resumeSectionTitle}>Tamaño de la empresa</p>
                    <p className={style.resumeSectionDescription}>{resume.companySize}</p>
                </div>
                <div className={style.resumeSection}>
                    <p className={style.resumeSectionTitle}>Tipo de venta</p>
                    <p className={style.resumeSectionDescription}>{resume.saleType}</p>
                </div>
                <div className={style.resumeSection}>
                    <p className={style.resumeSectionTitle}>Vigencia de la campaña</p>
                    <p className={style.resumeSectionDescription}>{resume.campaignDuration}</p>
                </div>
                <div className={style.resumeSectionMore}>
                    <p className={style.resumeSectionTitle}>Más info</p>
                    <p className={style.resumeSectionDescription}>{resume.details}</p>
                </div>
            </div>
    )
}