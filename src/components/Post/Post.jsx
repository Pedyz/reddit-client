import Style from './Post.module.css'

function Post({data, name, text, imgUrl, videoUrl}) {

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
    } else if (data.is_self) {
        option = null
    } else {
        const previewImage = data?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") || null;
        
        option =
            <div className={Style.imgDiv}>
                <img src={previewImage} />
            </div>
    }

    return (
        <div className={Style.post}>
            <div className={Style.postInfo}>
                <img src='images/reddit-logo.png' />
                <p>{name}</p>
            </div>
            <p className={Style.postText}>{text}</p>
            {option}
        </div>
    )
}

export default Post