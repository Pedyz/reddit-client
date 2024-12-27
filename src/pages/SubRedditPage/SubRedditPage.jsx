import Style from './SubRedditPage.module.css'
import { getSubRedditInfo } from '../../app/slices/subreddit/subRedditInfoSlice'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function SubRedditPage() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { info, posts, status } = useSelector(state => state.subRedditInfo)
    const path = location.pathname

    useEffect(() => {
        dispatch(getSubRedditInfo(path))
    }, [])

    useEffect(() => {
        if (info.url) {
            document.title = info.url.slice(0, -1)
        }
    }, [info])

    const render = () => {
        if (status === 'loading') {
            return <h2 className={Style.loading}>Loading</h2>
        } else if (status === 'failed') {
            return null
        } else {
            return (
                <div className={Style.imagesBlock}>
                    <img style={{'backgroundImage': `url(${info.banner})`}} className={Style.bannerImg} />
                    <img src={info.icon} className={Style.iconImg} />
                    <div className={Style.smallInfos}>
                        <p className={Style.title}>{info.name}</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={Style.firstBlock} >
            {render()}
        </div>
    )
}

export default SubRedditPage