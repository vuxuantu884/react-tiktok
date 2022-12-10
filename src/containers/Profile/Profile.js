import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Row } from '@mycv/mycv-grid'
import LoadingBar from 'react-top-loading-bar'

import { ProfileDetail, UserInfo, VideoItem } from '~/components/ProfileDetail'
import LikedVideo  from '~/modules/LikedVideo'
import TabList, { TabItem, TabContent } from '~/packages/ducdm-tab'

const MYVIDEO_TAB = 'MYVIDEO_TAB'
const LIKEDVIDEO_TAB = 'LIKEDVIDEO_TAB'

function Profile() {

    const { nickname } = useParams()
    const [tab, setTab] = useState(MYVIDEO_TAB)
    const [progress, setProgress] = useState(0)
    const [user, setUser] = useState(null)
    const [currentVideo, setCurrentVideo] = useState(null)

    const tabList = useRef([
        {
            title: "My Video",
            subTitle: MYVIDEO_TAB,
            setTab:() => setTab(MYVIDEO_TAB),
        },
        {
            title: "Liked Video",
            subTitle: LIKEDVIDEO_TAB,
            setTab:() =>  setTab(LIKEDVIDEO_TAB),
        },

    ])

    useEffect(() => {
        axios.get(`/api/users/@${nickname}`)
            .then(res => {
                
                setUser(res.data)
                setCurrentVideo(res.data.posts[0])
                setTab(MYVIDEO_TAB)
                setProgress(100)
            })
            .catch(err => {

            })
    }, [nickname])


    const checkPlaying = video => {
        return !!currentVideo && currentVideo.id === video.id
    }

    const handleMouseEnterVideo = video => {
        setCurrentVideo(video)
    }

    const handleToggleFollow = (user) => {
        let apiPath = `/api/users/${user.id}/follow`
        if (user.is_followed)
            apiPath = `/api/users/${user.id}/unfollow`

        axios
            .post(apiPath)
            .then((res) => {
                setUser({
                    ...res.data,
                    posts: user.posts
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }

    if (!user) {
        return <h2>Loading</h2>
    }

    return (
        <ProfileDetail>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <UserInfo
                userInfo={user}
                onToggleFollow={handleToggleFollow}
            />
                <TabList>
                    {tabList.current.map((tabItem, index) => (
                        <TabItem
                        key={index}
                        isOpen={tab === tabItem.subTitle}
                        tabName={tabItem.title}
                        onClick={tabItem.setTab}
                        />
                    ))}
                </TabList>

                <TabContent
                    isOpen={tab === MYVIDEO_TAB}
                >
                    <Row>
                        {user.posts?.map(post => (
                            <VideoItem
                                key={post.id}
                                post={post}
                                isPlaying={checkPlaying(post)}
                                onMouseEnter={handleMouseEnterVideo}
                            />
                        ))}
                    </Row>
                </TabContent>

                <TabContent
                    isOpen={tab === LIKEDVIDEO_TAB}
                >
                    <LikedVideo
                        user={user}
                    />
                </TabContent>


        </ProfileDetail>
    )
}


export default Profile