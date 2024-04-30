"use client";
import React, { useEffect, useState } from 'react'
import style from './BriefResume.module.css'
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { useAtom, useAtomValue } from 'jotai';
import { Area, typeArea } from '@/atoms/type';

interface briefResume {
    customer?: string,
    companySize?: number,
    salesApproach?: string,
    campaignDuration?: string,
    details?: string
    scenery?: string,
    challenge?: string,
    campaign?: any
}

export default function BriefResume() {

    const { lng } = useParams();
    const { t } = useTranslation(lng, "resume");
    const type: any = useAtomValue(typeArea);

    const getIndexLng = () => {
        // return 'marketing'
        if ( type == Area.SALES ) return 'sales';
        else return 'marketing'
    }

    const resume : briefResume = {
        // customer: 'CEO',
        // companySize: 40,
        // salesApproach: 'Reunión closer',
        // campaignDuration: '14 meses',
        // details: 'Empresa especializada en el desarrollo de soluciones de software personalizadas para empresas, con un enfoque particular en soluciones de automatización para la industria de manufactura y logística. Además, la empresa ofrece consultoría en transformación digital y servicios de mantenimiento de sistemas.',
        scenery: 'Eres el especialista en marketing digital de "Artesanía Creativa", una pequeña empresa que vende productos artesanales hechos a mano a través de su sitio web',
        challenge: 'Artesanía Creativa tiene una presencia limitada en línea. Si bien cuentan con un sitio web funcional y atractivo, su alcance en redes sociales es mínimo y no han invertido',
        campaign: {
            strategy: 'Diseñar una campaña de anuncios en Facebook dirigida a usuarios interesados en productos artesanales',
            tactics: 'Utilizar imágenes llamativas de los productos, mensajes que resalten la calidad',
            consequences: 'Aumento significativo del tráfico web, mayor conocimiento de marca, potencial para generar leads y conversiones'
        }
    }
    


    function getValueByKey( object: any, k : any) {
        return object[k];
      }
    
    return (
            <div className={style.card} >
            {
                Object.keys(resume).map((val, key) => (    
                    <div className={ val != 'details' && val != 'campaign' ? style.resumeSection : style.resumeSectionMore}>
                        
                        {
                            val != 'campaign' ?
                            <>
                                <p className={style.resumeSectionTitle}> {t(`BriefResume.${getIndexLng()}.${val}.title`)} </p>
                                <p className={style.resumeSectionDescription}>{`${getValueByKey(resume, val)}`}</p>
                            </>
                            :
                            <>   
                                <p className={style.resumeSectionTitle}>Campaña de Facebook Ads enfocada en tráfico web</p>
                                    {Object.keys(resume.campaign).map((value,k) => (
                                    <li className={style.resumeSectionList}>
                                       <span className={style.resumeSectionListSpanTitle}>{t(`BriefResume.${getIndexLng()}.${val}.${value}`)}: </span>
                                       <span className={style.resumeSectionListSpanDescription}>{getValueByKey(getValueByKey(resume,val), value)}</span>
                                    </li>
                                ))}
                            </>
                        }
                    </div>    
                ))
            }
            </div>
    )
}