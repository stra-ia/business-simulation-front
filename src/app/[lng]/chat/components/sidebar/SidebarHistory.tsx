 // Clickable menu items
 import { useParams } from 'next/navigation';
 import React, { useEffect, useMemo } from 'react';
 import style from './sidebarHistory.module.css'

  interface SidebarHistory {
    histories: any[],
    onClick?: any
  }
 
  export default function SidebarHistory ({ histories, onClick } : SidebarHistory) {
    
    const { lng } = useParams();
    const format = () => {
        return lng == 'en' ? 'en-US' : 'mx-MX';
    }

    const groupMessagesByDateAndSender = ( arr : any) => {
        return arr.reduce((groups: any, history: any) => {
            const dayWeek = history.date.toLocaleDateString(format(), { weekday: "long" });  
            const dayMonth = history.date.getDate(); 
            const monthName = history.date.toLocaleDateString(format(), { month: "long" }); 
            const formattedDate = `${dayWeek.charAt(0).toUpperCase()}${dayWeek.slice(1)}, ${dayMonth} ${monthName}`;

            if (!groups[formattedDate]) {
                groups[formattedDate] = [];
            }
            groups[formattedDate].push([history]);
            return groups
        }, {});
    }

    const groups = useMemo(
        () => Object.entries(groupMessagesByDateAndSender(histories)),
    [histories],
    );
    
 
    return (
        <div className={style.sidebarHistory}>
            {
                groups.map(([date, historiesGroup], index) => (
                    <div key={index} className={style.sideBarHistoryCard}>
                        <span className={ style.dateSpan }>{date}</span>
                        {
                            historiesGroup.length > 0 && histories.map(( item, i ) => (
                                <div key={i}>
                                    <li>{item.name}</li>
                                </div>
                            )) 
                        }
                    </div>
                ))
            }
        </div>
     )
 }