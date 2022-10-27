import { useEffect, useRef } from 'react'
import { Fragment } from 'react'
import { Waypoint } from 'react-waypoint'

import styles from './VideoItem.module.scss'
import { PlayIcon } from '~/packages/ducdm-icon'

const defaultFn = () => { }

function VideoItem({
    post,
    isLast,
    isPlaying = false,
    onMouseEnter = defaultFn,
    onLastEnter = defaultFn,
}) {
    const videoRef = useRef(null)
    const props = {}
    let Component = Fragment
    if (isLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }

    useEffect(() => {
        if (!videoRef.current)
            return
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isPlaying])

    return (
        <Component {...props}>
            <div className={styles.videoItem} >
                <div className={styles.card} >
                    <video
                        muted
                        className={styles.video}
                        poster={post.thumb_url}
                        ref={videoRef}
                        loop
                        src={post.file_url}
                        onMouseEnter={() => onMouseEnter(post)}
                    />

                </div>
                <div className={styles.cardContent}>
                    <div className={styles.views}>
                        <PlayIcon className={styles.icon} />
                        <span className={styles.count}>{post.views_count}</span>
                    </div>
                </div>
            </div>
        </Component>
    )
}

export default VideoItem
