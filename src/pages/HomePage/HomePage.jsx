import Style from './HomePage.module.css'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'

function HomePage() {
    return (
        <div className={Style.topDiv}>
            <NavBar />
            <SideBar />
        </div>
    )
}

export default HomePage