import Style from './Comments.module.css'
import { getPostComments } from '../../app/slices/posts/postCommentsSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Comment from './Comment/Comment'

function Comments() {
    const { info } = useSelector(state => state.postComments)
    const dispatch = useDispatch()
    const location = useLocation()
    const result = location.pathname
        .split('/')
        .filter(Boolean)
        .slice(0, -1)
        .map((part) => `/${part}`)
        .join('')

    useEffect(() => {
        dispatch(getPostComments(result))
    },[result])

    return (
        <div className={Style.topDiv}>
            {info && info.length > 0 ? (
                info.map((comment) => (
                    <Comment 
                        key={comment.id} 
                        upvotes={comment.upvotes}
                        name={comment.author}
                        text={comment.body}
                        icon={comment.icon} 
                    />
                ))
            ) : null}
        </div>
    )
}

export default Comments