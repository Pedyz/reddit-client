import Style from './HomePage.module.css'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Timeline from '../../components/Timeline/Timeline'

function HomePage() {
    return (
        <div className={Style.topDiv}>
            <NavBar />
            <div className={Style.secondDiv}>
                <SideBar />
                <Timeline />
            </div>
        </div>
    )
}

export default HomePage