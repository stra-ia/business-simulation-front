"use client";
import React, { useEffect, useState } from 'react'
import style from './BriefResume.module.css'
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { useAtom, useAtomValue } from 'jotai';
import { Area, typeArea } from '@/atoms/type';

interface briefResume {
    clientType?: string,
    companySize?: number,
    saleType?: string,
    campaignDuration?: string,
    details?: string
    scenery?: string,
    challenge?: number,
}

export default function BriefResume() {

    const { lng } = useParams();
    const { t } = useTranslation(lng, "resume");
    const type: any = useAtomValue(typeArea);
    console.log(type,'type')
    const resume : briefResume = {
        clientType: 'CEO',
        companySize: 40,
        saleType: 'Reunión closer',
        campaignDuration: '14 meses',
        details: 'Empresa especializada en el desarrollo de soluciones de software personalizadas para empresas, con un enfoque particular en soluciones de automatización para la industria de manufactura y logística. Además, la empresa ofrece consultoría en transformación digital y servicios de mantenimiento de sistemas.'
    }

    return (
            <div className={style.card} >
                { type == Area.SALES  ? 
                    <>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}> {t(`BriefResume.sales.clientType.title`)} </p>
                            <p className={style.resumeSectionDescription}>{resume.clientType}</p>
                        </div>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}>{t(`BriefResume.sales.companySize.title`)}</p>
                            <p className={style.resumeSectionDescription}>{resume.companySize}</p>
                        </div>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}>{t(`BriefResume.sales.saleType.title`)}</p>
                            <p className={style.resumeSectionDescription}>{resume.saleType}</p>
                        </div>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}>{t(`BriefResume.sales.campaignDuration.title`)}</p>
                            <p className={style.resumeSectionDescription}>{resume.campaignDuration}</p>
                        </div>
                        <div className={style.resumeSectionMore}>
                            <p className={style.resumeSectionTitle}>{t(`BriefResume.sales.details.title`)}</p>
                            <p className={style.resumeSectionDescription}>{resume.details}</p>
                        </div>
                    </>
                    :
                    <>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}> {t(`BriefResume.marketing.scenery.title`)} </p>
                            <p className={style.resumeSectionDescription}>{resume.clientType}</p>
                        </div>
                        <div className={style.resumeSection}>
                            <p className={style.resumeSectionTitle}>{t(`BriefResume.marketing.challenge.title`)}</p>
                            <p className={style.resumeSectionDescription}>{resume.companySize}</p>
                        </div>
                    </>
                }
            </div>
    )
}