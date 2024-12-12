import Style from './Timeline.module.css'
import Post from '../Post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getHomePagePosts, getSearchPosts } from '../../app/slices/posts/postsSlice'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'


function Timeline() {
    const { posts, status, error } = useSelector(state => state.posts)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const query = queryParams.get("q")

        if(query) {
            dispatch(getSearchPosts(location.search))
        } else {
            dispatch(getHomePagePosts())
        }
    }, [dispatch, location.search])

    const filterPosts = () => {
        if(status === 'loading') {
            return <h2>Loading...</h2>
        }

        return posts.map(post => (
            <div>
                <Post subIcon={post.subIcon} data={post.data} key={post.key} name={post.name} text={post.text} imgUrl={post.imgUrl} videoUrl={post.videoUrl && post.videoUrl.reddit_video ? post.videoUrl.reddit_video.fallback_url : null} />
                <div className={Style.postDivider}></div>
            </div>
        ))
    }    

    return (
        <div className={Style.timelineDiv}>
            {filterPosts()}
        </div>
    )
}

export default Timeline