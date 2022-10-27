import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { Waypoint } from 'react-waypoint'

import styles from './Comment.module.scss'

const defaultFn = () => { }

function CommentItem({
    data = null,
    userId,
    isLast = false,
    onMouseEnter = defaultFn,
    onLastEnter = defaultFn,

    
}) {

    const props = {}
    let Component = Fragment
    if (isLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }
    return (
        <Component {...props}>
            <div className={styles.commentItem}>
                <Link to="/">
                    <img
                        className={styles.avatar}
                        src={data.user.avatar}
                        alt=""
                    />
                </Link>

                <div className={styles.content}>
                    <Link to="/" className={styles.userInfo}>
                        <span className={styles.username}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                        {data.user.tick && (
                            <FontAwesomeIcon className={styles.verifyIcon} icon={faCheckCircle} />
                        )}

                        {userId === data.user.id && (
                            <>
                                <span> · </span>
                                <span className={styles.identity}>Creator</span>
                            </>
                        )}

                    </Link>

                    <div className={styles.commentText}>
                        <span>{data.comment}</span>
                        <div className={styles.commentInfo}>
                            <span className={styles.time}>{data.published_at_from_now}</span>
                            <span className={styles.reply}>Reply</span>
                        </div>
                    </div>
                </div>

                <div className={[styles.like, data.is_liked && styles.liked].join(' ')} onClick={() => { }}>
                    <FontAwesomeIcon icon={faHeart} className={styles.likeIcon} />
                    <span className={styles.count}>{data.likes_count}</span>
                </div>
        </div>
        </Component>
    )
}

export default CommentItem