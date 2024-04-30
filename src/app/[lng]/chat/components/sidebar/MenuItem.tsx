 // Clickable menu items
 import Link from 'next/link';
 import style from './MenuItem.module.css'
 interface MenuItem {
    name: string,
    route?: string,
    onClick?: any
 }

 export default function MenuItem ({ name, route, onClick } : MenuItem) {
    // Highlight menu item based on currently displayed route

    return (
        <button className={style.menuItemBody}
            onClick={() => {
               console.log('a')
            }}
        >
           <p>{name}</p> 
        </button>
    )
}