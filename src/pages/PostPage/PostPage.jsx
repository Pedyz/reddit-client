import Style from './PostPage.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPostData } from '../../app/slices/posts/postInfoSlice'
import { useSelector } from 'react-redux'
import upArrow from '../../images/arrow-up.png'
import downArrow from '../../images/down-arrow.png'
import balloon from '../../images/balloon.png'
import leftArrow from '../../images/left-arrow.png'
import SubRedditInfo from '../../components/SubRedditInfo/SubRedditInfo'
import Comments from '../../components/Comments/Comments'

function PostPage() {
    const { info, status } = useSelector(state => state.postInfo)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pathname = location.pathname.slice(0, -1)    

    const chooseMedia = () => {
        if (info?.videoUrl) {
            return <video src={info.videoUrl} controls className={Style.media} />
        } else if (info?.imgUrl) {
            return <img src={info.imgUrl} className={Style.media} />
        }
        return null
    }

    useEffect(() => {
        dispatch(getPostData(pathname))        
    }, [])

    const renderPost = () => {
        if(status === 'loading') {
            return (
            <div className={Style.loading}>
                <h2>Loading...</h2>
            </div>
        )
        }

        return (
            <div className={Style.topDiv}>
                <img className={Style.returnBtn} src={leftArrow} onClick={() => navigate(-1)} />
                <main className={Style.mainDiv}>
                    <div className={Style.postDiv}>
                        <div className={Style.postInfo}>
                            <img src={info.subRedditIcon} onClick={() => navigate(`/${info.subReddit}`)} />
                            <div className={Style.postInfoTexts}>
                                <p className={Style.subP} onClick={() => navigate(`/${info.subReddit}`)} >{info.subReddit}</p>
                                <p>{info.author}</p>
                            </div>
                        </div>
                        <h2>{info.text}</h2>
                        <div className={Style.imgDiv}>
                            {chooseMedia()}
                        </div>
                        <div className={Style.likesDiv}>
                            <div className={Style.likesContainer}>
                                <img src={upArrow} className={Style.upArrow} />
                                <p>{info.data.score}</p>
                                <img src={downArrow} className={Style.downArrow} />
                            </div>
                            <div className={Style.smallContainer}>
                                <img src={balloon} />
                                <p>{info.data.num_comments}</p>
                            </div>
                        </div>
                    </div>
                    <Comments />
                </main>
                <SubRedditInfo />
            </div>
        )
    }

    return (
        renderPost()
    )
}

export default PostPage