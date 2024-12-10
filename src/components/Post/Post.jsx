import Style from './Post.module.css'

function Post({name, text, imgUrl}) {
    return (
        <div className={Style.post}>
            <div className={Style.postInfo}>
                <img src='images/reddit-logo.png' />
                <p>r/{name}</p>
            </div>
            <p className={Style.postText}>{text}</p>
            <div className={Style.imgDiv}>
                <img src={imgUrl} />
            </div>
        </div>
    )
}

export default Post