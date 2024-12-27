import Style from './Comment.module.css'
import upArrow from '../../../images/arrow-up.png'
import downArrow from '../../../images/down-arrow.png'
import { useNavigate } from 'react-router-dom'

function Comment({ name, upvotes, text, icon }) {
    const navigate = useNavigate()

    return (
        <div className={Style.comment}>
            <div className={Style.userInfo}>
                <img src={icon} onClick={() => navigate(`/user/${name}`)} />
                <h4 onClick={() => navigate(`/user/${name}`)} >{name}</h4>
            </div>
            <p className={Style.mainText}>{text}</p>
            <div className={Style.commentLikes}>
                <img src={upArrow} />
                <p>{upvotes}</p>
                <img src={downArrow} />
            </div>
        </div>
    )
}

export default Comment