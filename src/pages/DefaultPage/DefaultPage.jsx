import NavBar from "../../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"
import SideBar from "../../components/SideBar/SideBar"
import Style from './DefaultPage.module.css'
import { useEffect } from "react"

function DefaultPage() {
    useEffect(() => {
        window.title = 'Reddit Mini'
    }, [])

    return (
        <div>
            <NavBar />
            <div className={Style.teste}>
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultPage