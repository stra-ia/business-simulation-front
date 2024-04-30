 // Clickable menu items
import style from './MenuItem.module.css'
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
 interface MenuItem {
    name: string,
    onClick?: any
 }

 export default function MenuItem ({ name, onClick } : MenuItem) {
   const { lng } = useParams();
   const { t } = useTranslation(lng, "sidebar");
    // Highlight menu item based on currently displayed route

    return (
        <button className={style.menuItemBody}
            onClick={() => {
               console.log('a')
            }}
        >
           <p> {t(`sidebar.${name}`)}</p> 
        </button>
    )
}