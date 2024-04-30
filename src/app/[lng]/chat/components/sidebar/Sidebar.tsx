// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import MenuItem from './MenuItem'
import style from './Sidebar.module.css'
import { useParams, useSearchParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import SidebarHistory from './SidebarHistory'
import { useAtomValue, useSetAtom } from 'jotai'
import { Area, typeArea } from '@/atoms/type'

interface sideBar {
    showSidebar: any,
    setShowSidebar: any
}

export default function Sidebar({ showSidebar, setShowSidebar } : sideBar) {

    const { lng } = useParams();
    const { t } = useTranslation(lng, "sidebar");
    const setAreaType = useSetAtom(typeArea);
    const AreaType = useAtomValue(typeArea);
    const options = [
        {
           name: 'sales'
        },
        {
            name: 'marketing'
        }
    ]
    const histories = [
        {
            name: 'Campaña de marketing 2023',
            date: new Date('2024-02-13T03:24:00')
        },
        {
            name: 'Campaña de sales 2023',
            date: new Date('2024-02-13T03:24:00')
        },
        {
            name: 'Campaña de ventas 2023',
            date: new Date('2024-04-13T03:24:00')
        },
        {
            name: 'Marketing en el caribe 2023',
            date: new Date('2024-04-13T03:24:00')
        }
    ]

    const setLngParam = ( lenguage: string ) => {
        window.location.href = `http://localhost:3000/${lenguage}/chat`
    } 

    const setType = ( type : Area ) => {
        setShowSidebar(false);
        setAreaType(type);
    }

    useEffect(() => {
        console.log(AreaType,'AreaType')
    },[AreaType])

    return (
        <>
        {
            showSidebar ?
            <div className={style.sidebarMainContainer}>
                <div className={`${style.sidebarBody}${style.appendClass}`}>
                    <div className={style.sidebarHeader}>
                        <div className={style.sideBarHeaderLink}>
                            <img 
                                src='/highVoltage.svg' 
                                alt="High Voltage Logo" 
                                width={40} 
                                height={40} />
                            <p className={style.sidebarHeaderTitle}>AI Generator</p>
                            <img 
                                onClick={ () => setLngParam('es') }
                                className={`${lng === 'en' ? style.sidebarHeaderFlagOff : style.sidebarHeaderFlag}`} 
                                src='/spain.svg' alt="Spain flag" 
                                width={20} height={20} />
                            <img 
                                onClick={ () => setLngParam('en') }
                                className={`${lng === 'es' ? style.sidebarHeaderFlagOff : style.sidebarHeaderFlag}`} 
                                src='/uk.svg' alt="Spain flag" 
                                width={20} height={20} />
                        </div>
                    </div>
                    <hr className={style.hr} />
                    <h3 className={style.sidebarH3}>{t(`sidebar.slogan`)} <span className={style.sidebarH3span}>{t(`sidebar.sloganSpan`)}</span></h3>
                    <div className={style.sidebarOption}>
                        <button className={style.sideBarAddButton}>
                            <img 
                                className={style.sidebarHeaderPlus} 
                                src='/plus.svg' alt="plus icon" 
                                width={20} height={20} />
                            <p> {t(`sidebar.newCampaign`)} </p>
                        </button>
                        {
                            options.map(({ name }) => (
                                <MenuItem 
                                    name={name}
                                    onClick={setType}  />
                            ))
                        }
                    </div>
                    <SidebarHistory histories={histories}/>
                </div>
                {/* <img 
                    onClick={ () => setShowSidebar(!showSidebar)}
                    className={style.sidebarHeaderArrow} 
                    src='/sideArrow.svg' alt="side arrow" 
                    width={20} height={20} /> */}
            </div>
            :
            <div className={`${style.sidebarBodyHidden}`} onClick={ () => setShowSidebar(!showSidebar)}>
                <img 
                    className={style.sidebarHeaderArrow} 
                    src='/sideArrow.svg' alt="side arrow" 
                    width={20} height={20} />
                
            </div>
            }
            {/* { showSidebar ? <Overlay /> : <></>} */}
        </>
    )
}