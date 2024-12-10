import Style from './Timeline.module.css'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'

function Timeline() {
    const [postsList, setPostsList] = useState([])

    useEffect(() => {
        getHomePagePostsInfo()
    },[])

    const getHomePageJson = async () => {
        const response = await fetch('https://www.reddit.com/.json')
        const json = await response.json()
        const data = json.data

        return data
    }

    const getHomePagePostsInfo = async () => {
        const posts = await getHomePageJson()

        

        const obj = posts.children.map(post => {
            return {
                data: post.data,
                name: post.data.subreddit_name_prefixed,
                text: post.data.title,
                imgUrl: post.data.url,
                videoUrl: post.data.media,
                key: post.data.id
        }})
        console.log(posts)

        console.log(obj)
        setPostsList(obj)
        return obj
    }

    return (
        <div className={Style.timelineDiv}>
            {postsList.map(post => (
                <div>
                    <Post data={post.data} key={post.key} name={post.name} text={post.text} imgUrl={post.imgUrl} videoUrl={post.videoUrl ? post.videoUrl.reddit_video.fallback_url : null} />
                    <div className={Style.postDivider}></div>
                </div>
            ))}
            
        </div>
    )
}

export default Timeline