import Style from './SubRedditPage.module.css'
import { getSubRedditInfo, getSubRedditPosts } from '../../app/slices/subreddit/subRedditInfoSlice'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecent } from '../../app/slices/recent/recentSlice'
import SubRedditInfo from '../../components/SubRedditInfo/SubRedditInfo'
import Post from '../../components/Post/Post'
import purpleIcon from '../../images/reddit-logo.png'

function SubRedditPage() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { info, posts, status } = useSelector(state => state.subRedditInfo)
    const path = location.pathname
    
    console.log(posts)

    useEffect(() => {
        dispatch(getSubRedditInfo(path))
        dispatch(getSubRedditPosts(path))
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
                            {posts?.map(post => 
                                <Post data={post.data} name={post.data.name} text={post.data.title} imgUrl={post.data.url || purpleIcon} videoUrl={post.videoUrl} subIcon={post.data.icon_img || purpleIcon} />
                            )}
                        </div>
                        <SubRedditInfo size='big' />
                    </div>
                </div>
            )
        }
    }

    return render()
}

export default SubRedditPage