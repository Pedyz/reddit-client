import Style from './SubRedditPage.module.css'
import { getSubRedditInfo } from '../../app/slices/subreddit/subRedditInfoSlice'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecent } from '../../app/slices/recent/recentSlice'

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
            document.title = info.title
        }

        if (info.name) {
            const subredditName = info.name
            dispatch(addRecent(subredditName))
        }
    }, [info])

    const render = () => {
        if (status === 'loading') {
            return (
                <div className={Style.loading}>
                    <h2>Loading</h2>
                </div>
            )
        } else if (status === 'failed') {
            return null
        } else {
            return (
                <div className={Style.firstBlock}>
                    <div className={Style.imagesBlock}>
                        <img style={{'backgroundImage': `url(${info.banner})`}} className={Style.bannerImg} />
                        <img src={info.icon} className={Style.iconImg} />
                        <div className={Style.smallInfos}>
                            <p className={Style.title}>{info.name}</p>
                            <a href={`https://www.reddit.com/${info.name}`} className={Style.visitSubBtn}>Visit</a>
                        </div>
                    </div>
                    <div className={Style.secondBlock}>
                        <div className={Style.postsBlock}>

                        </div>
                        <div className={Style.infoBlock}>

                        </div>
                    </div>
                </div>
            )
        }
    }

    return render()
}

export default SubRedditPage