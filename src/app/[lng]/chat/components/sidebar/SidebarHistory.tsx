// Clickable menu items
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import style from './sidebarHistory.module.css'
import Image from 'next/image'

interface SidebarHistory {
  histories: any[]
  onClick?: any
}

interface History {
  date: Date
  name: string
}

export default function SidebarHistory({ histories, onClick }: SidebarHistory) {
  const { lng } = useParams()
  const format = () => {
    return lng == 'en' ? 'en-US' : 'mx-MX'
  }

  const groupMessagesByDateAndSender = (
    arr: History[]
  ): Record<string, History[]> => {
    return arr.reduce((groups: any, history: any) => {
      const dateYear = history.date.toLocaleDateString(format(), {
        year: 'numeric'
      })
      const monthName = history.date.toLocaleDateString(format(), {
        month: 'long'
      })
      const formattedDate = `${monthName
        .charAt(0)
        .toUpperCase()}${monthName.slice(1)} ${dateYear}`

      if (!groups[formattedDate]) {
        groups[formattedDate] = []
      }
      groups[formattedDate].push([history])
      return groups
    }, {})
  }

  const groups = useMemo(
    () => Object.entries(groupMessagesByDateAndSender(histories)),
    [histories]
  )

  return (
    <div className={style.sidebarHistory}>
      {groups.map(([date, historiesGroup], index) => (
        <div key={index} className={style.sideBarHistoryCard}>
          <span className={style.dateSpan}>{date}</span>
          {historiesGroup.length > 0 &&
            histories.map((item, i) => (
              <div className={style.itemContainer} key={i}>
                <li>{item.name}</li>
                <div className={style.IconContainer}>
                  <Image
                    priority
                    src={'/trash.svg'}
                    className={`${style.Icon}`}
                    height={15}
                    width={15}
                    alt="Trash icon"
                  />
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
