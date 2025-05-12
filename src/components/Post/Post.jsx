import Style from './Post.module.css'
import { useNavigate } from 'react-router-dom';

function Post({data, name, text, imgUrl, videoUrl, subIcon}) {
    const navigate = useNavigate()

    let option;

    function isImage(url) {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    }

    if (videoUrl) {
        option = 
        <div className={Style.imgDiv}>
            <video src={videoUrl} controls>    
            </video>
        </div>
    } else if (imgUrl && isImage(imgUrl)) {
        option =
        <div className={Style.imgDiv}>
            <img src={imgUrl} />
        </div> 
    } else if (data?.is_self) {
        option = null
    } else {
        const previewImage = data?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") || null;
        
        option =
            <div className={Style.imgDiv}>
                <img src={previewImage} />
            </div>
    }

    return (
        <div className={Style.post} onClick={() => navigate(`${data.permalink}`)} >
            <div className={Style.postInfo}>
                <img src={subIcon} onClick={() => navigate(`${data.url}`)} />
                <p onClick={() => navigate(`${data.url}`)}>{name}</p>
            </div>
            <p className={Style.postText}>{text}</p>
            {option}
        </div>
    )
}

export default Post