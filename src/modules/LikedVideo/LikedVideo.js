import {useState, useEffect } from 'react'
import axios from 'axios'
import UserContext from '~/contexts/UserContext'
import { Row } from '@mycv/mycv-grid'

import { VideoItem } from '~/components/ProfileDetail'
import { ErrorPage } from '~/components/ProfileDetail'


function LikedVideo({
    user
}) {
    const [videos, setVideos] = useState([])
    const [currentVideo, setCurrentVideo] = useState(null)
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })

    useEffect(() => {
        axios.get(`/api/users/${user.id}/liked-posts?page=${pagination.currentPage}`)
            .then(res => {
                const likedVideos = [...videos, ...res.data]
                setVideos(likedVideos)
                
                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })

                setCurrentVideo(likedVideos[0])
            })
            .catch(err => {

            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id, pagination.currentPage])

   
    const checkPlaying = video => {
        return !!currentVideo && currentVideo.id === video.id
    }

    const handleMouseEnterVideo = video => {
        setCurrentVideo(video)
    }

    const handleLoadMore = () => {
        if (
            videos.length >= pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination({
                currentPage: pagination.currentPage + 1
            })
        }
    }

    return (
        
        <UserContext.Consumer>
            {(currentUser) => currentUser?.id === user.id ? (
                <Row>
                    {videos.map((video, index) => (
                        <VideoItem
                            key={video.id}
                            post={video}
                            isLast={videos.length - 1 === index}
                            isPlaying={checkPlaying(video)}
                            onMouseEnter={handleMouseEnterVideo}
                            onLastEnter={handleLoadMore}
                        />
                    ))}
                </Row>) : (
                    <ErrorPage userName={user.username}/>
                )}
            
        </UserContext.Consumer>
        
    )
}

export default LikedVideo