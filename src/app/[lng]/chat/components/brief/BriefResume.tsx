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

    const getIndexLng = () => {
        if ( type == Area.SALES ) return 'sales';
        else return 'marketing'
    }

    const resume : briefResume = {
        clientType: 'CEO',
        companySize: 40,
        saleType: 'Reunión closer',
        campaignDuration: '14 meses',
        details: 'Empresa especializada en el desarrollo de soluciones de software personalizadas para empresas, con un enfoque particular en soluciones de automatización para la industria de manufactura y logística. Además, la empresa ofrece consultoría en transformación digital y servicios de mantenimiento de sistemas.'
    }


    function getValueByKey( k : any) {
        return resume[k];
      }
    
    return (
            <div className={style.card} >
            {
                Object.keys(resume).map((val, key) => (    
                    <div className={val != 'details' ? style.resumeSection : style.resumeSectionMore}>
                        <p className={style.resumeSectionTitle}> {t(`BriefResume.${getIndexLng()}.${val}.title`)} </p>
                        <p className={style.resumeSectionDescription}>{`${getValueByKey(val)}`}</p>
                    </div>    
                ))
            }
            </div>
    )
}