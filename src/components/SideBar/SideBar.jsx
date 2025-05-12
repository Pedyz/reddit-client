import Style from './SideBar.module.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function SideBar() {
    const navigate = useNavigate()

    const recent = useSelector(state => state.recent.recent)
    const recentList = sessionStorage.getItem('recent')

    const navStyles = {
        link: {
        },
        activeLink: {
            backgroundColor: '#252c31'
        }
    }

    const [isExpanded, setIsExpanded] = useState(true)

    const changeStyle = () => {
        setIsExpanded(prev => !prev)
    }

    return (
        <aside className={Style.sideBar}>
            <div className={Style.listsDiv}>
                <ul className={Style.firstList}>
                    <NavLink  style={({ isActive }) => (isActive ? navStyles.activeLink : navStyles.link)} className={Style.listItem} to='/'>Main Page</NavLink>
                </ul>
                <span className={Style.listDivider}></span>
                {recentList ? 
                <div className={Style.recentDiv}>
                    <h3 className={Style.recentTitle} onClick={changeStyle}>Recent</h3>
                    <ul className={Style.recentList} style={{height: isExpanded ? '100%' : '0%'}}>
                        {recent.map(item => (
                            <li onClick={() => navigate(`/${item}`)} className={Style.recentItem}>
                                {item}
                            </li>
                        ) 
                            
                        )}
                    </ul>
                </div>
                
                : <></>}
                
            </div>
        </aside>
    )
}

export default SideBar