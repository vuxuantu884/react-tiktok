
import { useEffect, useRef } from 'react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'

import Button from '~/packages/ducdm-button'
import styles from './FollowingList.module.scss'

const defaultFn = () => { }

function FollowingItem({
    data =[],
    isPlaying = false,
    isLast = false,
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
            <Link 
                to={`/@${data.nickname}`}
                target="_blank"
                className={styles.followingItem}
                onMouseEnter={() => onMouseEnter(data)}
            >
                <div className={styles.card} >
                    <video
                        muted
                        ref={videoRef}
                        className={styles.video}
                        poster={data.popular_post.thumb_url}
                        loop
                    >
                        <source src={data.popular_post.file_url} />
                    </video>

                    <div className={styles.overlay} />

                    <div className={styles.cardBackground}>
                        <img src={data.popular_post.thumb_url} alt="nothing" />
                        <div className={styles.cardContent}>
                            <div className={styles.cardAvatar}>
                                <img src={data.avatar} alt="" />
                            </div>

                            <h3 className={styles.cardHeading}>
                                {data.nickname}
                            </h3>

                            <p className={styles.cardDesc}>
                                {`${data.first_name} ${data.last_name}`}
                                {data.tick ? <FontAwesomeIcon className={styles.cardIcon} icon={faCheckCircle} /> : ''}

                            </p>
                            <div className={styles.cardBtn}>
                                <Button size="m" type="primary" borderColor="primaryColor">Follow</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Component>
    )
}

export default FollowingItem