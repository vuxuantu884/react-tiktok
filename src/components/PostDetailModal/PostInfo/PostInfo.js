import { useRef } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCheckCircle,
    faMusic,
    faHeart,
    faCommentDots,
} from "@fortawesome/free-solid-svg-icons"
import {
    faWhatsapp,
    faFacebook,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import Tooltip from "~/components/Tooltip"
import Button from "~/packages/ducdm-button"
import styles from "./PostInfo.module.scss"
import Toast from "~/components/Toast"

const defaultFn = () => {};

function PostInfo({
    post,
    musicContent = "",
    onToggleLike = defaultFn,
    onToggleFollow= defaultFn,
    onCopyVideoUrl = defaultFn,
    onShareWhatsapp = defaultFn,
    onShareFacebook = defaultFn,
    onShareTwitter = defaultFn,
}) {
    const textAreaRef = useRef(null)
    return (
        <div className={styles.wrapper}>
            <div className={styles.userInfo}>
                <div className={styles.userItem}>
                    <div className={styles.avatar}>
                        <img src={post.user.avatar} alt="" />
                    </div>
                    <div className={styles.userBody}>
                        <div className={styles.userTitle}>
                            <h3 className={styles.userHeading}>
                                {post.user.nickname}
                            </h3>
                            {post.user.tick ? (
                                <FontAwesomeIcon
                                    className={styles.userIcon}
                                    icon={faCheckCircle}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <p
                            className={styles.userDesc}
                        >{`${post.user.first_name} ${post.user.last_name}`}</p>
                    </div>
                    <div 
                        className={styles.followBtn}
                        onClick={() => onToggleFollow(post)}
                    >
                        {post.user.is_followed ? (
                            <Button type="normal" borderColor="normalBorder" size="s">
                                Following
                            </Button>
                        ) : (
                            <Button
                                type="border"
                                textColor="primaryText"
                                borderColor="primaryBorder"
                                color="primaryColor"
                                size="s"
                            >
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.contentInfo}>
                <p className={styles.title}>{post.description}</p>
                <div className={styles.musicBox}>
                    <FontAwesomeIcon
                        icon={faMusic}
                        className={styles.musicIcon}
                    />
                    <div className={styles.musicContent}>
                        <Link className={styles.musicLink} to="/">
                            {musicContent}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.actionBox}>
                <div className={styles.reactionBox}>
                    <div className={styles.actionItem}>
                        <button
                            className={[
                                styles.actionBtn,
                                post.is_liked ? styles.liked : "",
                                styles.select,
                            ].join(" ")}
                            onClick={() => onToggleLike(post)}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={styles.icon}
                            />
                        </button>
                        <span className={styles.reactionCount}>
                            {post.likes_count}
                        </span>
                    </div>

                    <div className={styles.actionItem}>
                        <button
                            className={styles.actionBtn}
                            onClick={defaultFn}
                        >
                            <FontAwesomeIcon
                                icon={faCommentDots}
                                className={styles.icon}
                            />
                        </button>
                        <span className={styles.reactionCount}>
                            {post.comments_count}
                        </span>
                    </div>
                </div>

                <div className={styles.shareBox}>
                    <p className={styles.shareWord}>Share To</p>
                    <div className={styles.shareGroup}>
                        <Tooltip content="Share to Whatsapp" interactive>
                            <button
                                className={[
                                    styles.shareBtn,
                                    styles.whatsapp,
                                ].join(" ")}
                                onClick={onShareWhatsapp}
                            >
                                <FontAwesomeIcon
                                    className={styles.shareIcon}
                                    icon={faWhatsapp}
                                />
                            </button>
                        </Tooltip>

                        <Tooltip content="Share to Facebook" interactive>
                            <button
                                className={[
                                    styles.shareBtn,
                                    styles.facebook,
                                ].join(" ")}
                                onClick={onShareFacebook}
                            >
                                <FontAwesomeIcon
                                    className={styles.shareIcon}
                                    icon={faFacebook}
                                />
                            </button>
                        </Tooltip>

                        <Tooltip content="Share to Twitter" interactive>
                            <button
                                className={[
                                    styles.shareBtn,
                                    styles.twitter,
                                ].join(" ")}
                                onClick={onShareTwitter}
                            >
                                <FontAwesomeIcon
                                    className={styles.shareIcon}
                                    icon={faTwitter}
                                />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            
                <div className={styles.copyLink}>
                    <textarea
                        ref={textarea => textAreaRef.current = textarea}
                        readOnly
                        className={styles.link}
                        value={window.location.href}
                    />
                    
                        <div
                            className={styles.copyBtn}
                            onClick={() => onCopyVideoUrl(textAreaRef.current.value)}
                        >
                            <Toast message='Copied'>
                                <p className={styles.contentBtn}>Copy Link</p>
                            </Toast>
                        </div>
                </div>
            
        </div>
    )
}

export default PostInfo
