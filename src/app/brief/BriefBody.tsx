import React, { useEffect, useMemo, useRef } from 'react'
import style from './BriefBody.module.css'
import BriefCard from './BriefCard'

export default function BriefBody() {

    const campaign = false;

    return (
        <>
            <hr className={style.hr} />
            <div className={style.body}> 
                <BriefCard />
            </div>
            <div className={style.briefFooter}>
                <button className={ campaign ? `${style.closeCampaignButtonActive}` : `${style.closeCampaignButton}`}>
                    <p>Cerrar campaña</p>
                </button>
            </div>
        </>
    )
}