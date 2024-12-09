import Style from './SideBar.module.css'
import { NavLink } from 'react-router-dom'

function SideBar() {
    const navStyles = {
        link: {
        },
        activeLink: {
            backgroundColor: '#252c31'
        }
    }

    return (
        <aside className={Style.sideBar}>
            <div className={Style.listsDiv}>
                <ul className={Style.firstList}>
                    <NavLink  style={({ isActive }) => (isActive ? navStyles.activeLink : navStyles.link)} className={Style.listItem} to='/'>Main Page</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? navStyles.activeLink : navStyles.link)} className={Style.listItem} to='/popular'>Popular</NavLink>
                </ul>
                <span className={Style.listDivider}></span>
            </div>
        </aside>
    )
}

export default SideBar