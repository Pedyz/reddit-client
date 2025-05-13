import Style from './SubRedditInfo.module.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


function SubRedditInfo({size}) {
    const { info } = useSelector((state) => state.postInfo)
    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {  
        const fetchSubRedditData = async () => {
            const data = await getSubRedditInfo()
            setSubRedditInfo(data)
    
            setSubs(formatNumber(data.subscribers))
            setActiveUsers(formatNumber(data.accounts_active))
        }
        fetchSubRedditData()
    }, [])
    
    const getSubRedditInfo = async () => {
        const separatedPathName = location.pathname.split('/')
        const endPoint = separatedPathName[1] + "/" + separatedPathName[2] 
        const response = await fetch(`https://www.reddit.com/${endPoint}/about.json`)
        const json = await response.json()
        const data = json.data

        return data
    }

    const [subRedditInfo, setSubRedditInfo] = useState({})

    const [subs, setSubs] = useState('')
    const [activeUsers, setActiveUsers] = useState('')

    const formatNumber = (num) => {
        if (num > 999999) return `${(num / 1_000_000).toFixed(1)}Mi`
        if (num > 999) return `${(num / 1_000).toFixed(1)}K`
        return num
    }

    return (
        <div className={size === 'big' ? Style.bigTopDiv : Style.topDiv}>
            <h2 onClick={() => navigate(`/${info.subReddit}`)} >{info.subReddit}</h2>
            <div className={Style.subRedditDescription}>
                <h4>{subRedditInfo?.title}</h4>
                <p>{subRedditInfo?.public_description}</p>
            </div>
            <div className={Style.subRedditSubs}>
                <div className={Style.usersDiv}>
                    <p>{subs}</p>
                    <p className={Style.usersText}>Members</p>
                </div>
                <div className={Style.usersDiv}>
                    <p>{activeUsers}</p>
                    <p className={Style.usersText}>Online</p>
                </div>
            </div>
        </div>
    )
}

export default SubRedditInfo