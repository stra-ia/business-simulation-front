 // Clickable menu items
import style from './MenuItem.module.css'
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Area } from '@/atoms/type';
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
            onClick={() => onClick( name == Area.MARKETING.toLocaleLowerCase() ? Area.MARKETING : Area.SALES)}
        >
           <p className={style.menuItemButtonText}> {t(`sidebar.${name}`)}</p> 
        </button>
    )
}