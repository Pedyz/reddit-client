import Style from './SubRedditInfo.module.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SubRedditInfo() {
    const { info } = useSelector((state) => state.postInfo)
    const navigate = useNavigate()

    useEffect(() => {  
        changeSubRedditInfo()
        changeSubs()
        changeActiveUsers()
    }, [info])

    const getSubRedditInfo = async () => {
        const response = await fetch(`https://www.reddit.com/${info.subReddit}/about.json`)
        const json = await response.json()
        const data = json.data

        return data
    }

    const [subRedditInfo, setSubRedditInfo] = useState({})

    const changeSubRedditInfo = async () => {
        const obj = await getSubRedditInfo()

        setSubRedditInfo(obj)
    }

    const [subs, setSubs] = useState('')
    const [activeUsers, setActiveUsers] = useState('')

    const changeSubs = async () => {
        const obj = await getSubRedditInfo()

        if (obj.subscribers > 999999) {
            const num = obj.subscribers.toString()
            const total = num.slice(0, -6)
            setSubs(`${total} mi`)
        } else if (obj.subscribers > 999) {
            const num = obj.subscribers.toString()
            const total = num.slice(0, -3)
            setSubs(`${total}K`)
        } else {
            setSubs(obj.subscribers)
        }
    }

    const changeActiveUsers = async () => {
        const obj = await getSubRedditInfo()

        if (obj.accounts_active > 999999) {
            const num = obj.accounts_active.toString()
            const total = num.slice(0, -6)
            setActiveUsers(`${total} mi`)
        } else if (obj.accounts_active > 999) {
            const num = obj.accounts_active.toString()
            const total = num.slice(0, -3)
            setActiveUsers(`${total}K`)
        } else {
            setActiveUsers(obj.accounts_active)
        }
    }

    return (
        <div className={Style.topDiv}>
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