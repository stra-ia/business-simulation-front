// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import MenuItem from './MenuItem'
import style from './Sidebar.module.css'
import { useParams } from 'next/navigation'

interface sideBar {
    showSidebar: any,
    setShowSidebar: any
}

export default function Sidebar({ showSidebar, setShowSidebar } : sideBar) {

    const { lng } = useParams();
    console.log(lng,'lng')
    const routes = [
        {
           name: 'Ventas',
           route: '/es/chat',
        },
        {
            name: 'Marketing',
            route: '/es/chat',
        }
    ]
    // Overlay to prevent clicks in background, also serves as our close button
    // const Overlay = () => (
    //     <div
    //         className={style.modalOverlay}
    //         onClick={() => {
    //             setShowSidebar(!showSidebar)
    //         }}
    //     />
    // )

    return (
        <>
        {
            showSidebar ?
            <div className={style.sidebarMainContainer}>
                <div className={`${style.sidebarBody}${style.appendClass}`}>
                    <div className={style.sidebarHeader}>
                        <Link className={style.sideBarHeaderLink} href="/">
                            <img 
                                src='/highVoltage.svg' 
                                alt="High Voltage Logo" 
                                width={40} 
                                height={40} />
                            <p className={style.sidebarHeaderTitle}>AI Generator</p>
                            <img 
                                className={`${lng === 'en' ? style.sidebarHeaderFlagOff : style.sidebarHeaderFlag}`} 
                                src='/spain.svg' alt="Spain flag" 
                                width={20} height={20} />
                            <img 
                                className={`${lng === 'es' ? style.sidebarHeaderFlagOff : style.sidebarHeaderFlag}`} 
                                src='/uk.svg' alt="Spain flag" 
                                width={20} height={20} />
                        </Link>
                    </div>
                    <hr className={style.hr} />
                    <h3 className={style.sidebarH3}>¡Haz de tu campaña <span className={style.sidebarH3span}>la mejor!</span></h3>
                    <div className={style.sidebarOption}>
                        <button className={style.sideBarAddButton}>
                            <img 
                                className={style.sidebarHeaderPlus} 
                                src='/plus.svg' alt="plus icon" 
                                width={20} height={20} />
                            <p>Crear campaña</p>
                        </button>
                        {
                            routes.map(({ name, route}) => (
                                <MenuItem name={name} route={route} />
                            ))
                        }
                    </div>
                    <div className={style.sidebarHistory}>
                        <div className={style.sideBarHistoryCard}>
                            <p>Enero 2024</p>
                            <li>Campaña de marketing 2023</li>
                            <li>Campaña de sales 2023</li>
                        </div>
                        <div className={style.sideBarHistoryCard}>
                            <p>Febrero 2024</p>
                            <li>Campaña de ventas 2023</li>
                            <li>Marketing en el caribe 2023</li>
                        </div>
                    </div>
                </div>
                {/* <img 
                    onClick={ () => setShowSidebar(!showSidebar)}
                    className={style.sidebarHeaderArrow} 
                    src='/sideArrow.svg' alt="side arrow" 
                    width={20} height={20} /> */}
            </div>
            :
            <div className={`${style.sidebarBodyHidden}`}>
                <img 
                    onClick={ () => setShowSidebar(!showSidebar)}
                    className={style.sidebarHeaderArrow} 
                    src='/sideArrow.svg' alt="side arrow" 
                    width={20} height={20} />
                
            </div>
            }
            {/* { showSidebar ? <Overlay /> : <></>} */}
        </>
    )
}