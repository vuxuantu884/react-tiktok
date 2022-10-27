import { Waypoint } from "react-waypoint"
import { useEffect, useRef } from "react"
import { Fragment } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCheckCircle,
    faHeart,
    faCommentDots,
    faShare,
    faMusic,
    faPlay,
    faPause,
    faVolumeUp,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons"

import UserContext from "~/contexts/UserContext"
import Popper from "~/components/Popper";
import SharePreview from "~/components/SharePreview"
import AccountPreview from "~/components/AccountPreview"
import Button from "~/packages/ducdm-button"
import styles from "./PostItem.module.scss"

const defaultFn = () => {};

function PostItem({
    data,
    type,
    postUrl,
    separate = true,
    isPlaying = false,
    isMuted = false,
    isWaypoint = false,
    stopWhenPaused = false,
    isLast = false,
    onShare = defaultFn,
    onShowDetail = defaultFn,
    onWaypointEnter = defaultFn,
    onReport = defaultFn,
    onTogglePlay = defaultFn,
    onToggleMute = defaultFn,
    onToggleLike = defaultFn,
    onToggleFollow = defaultFn,
    getVideoRef = defaultFn,
    onCopyVideoUrl = defaultFn,
    onShareWhatsapp = defaultFn,
    onShareFacebook = defaultFn,
    onShareTwitter = defaultFn,
    onLastEnter= defaultFn,
}) {
    const videoRef = useRef(null)
    const props = {}
    let Component = Fragment
    if (isLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }
    useEffect(() => {
        
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            if (stopWhenPaused) videoRef.current.currentTime = 0;
        }
    }, [isPlaying, stopWhenPaused]);


    return (
        <Component {...props}>
            <div
                className={[styles.wrapper, separate ? styles.separate : ""].join(
                    " "
                )}
            >
                <Link to={`/@${data.user.nickname}`} className={styles.avatarBox}>
                    <img
                        src={data.user.avatar}
                        className={styles.avatar}
                        alt={data.user.nickname}
                        title={`${data.user.first_name} ${data.user.last_name} (@${data.user.first_name} ${data.user.last_name}) | TikTok`}
                    />
                </Link>
                <div className={styles.content}>
                    <Popper
                        placement="bottom"
                        interactive
                        minWidth={320}
                        offset={[-230, 44]}
                        delay={[1000, 0]}
                        render={() => (
                            <AccountPreview
                                data={data}
                                avatar={data.user.avatar}
                                title={data.user.nickname}
                                desc={`${data.user.first_name} ${data.user.last_name}`}
                                followersCount={data.user.followers_count}
                                likesCount={data.user.likes_count}
                                linkTo={`/@${data.user.nickname}`}
                                tick={data.user.tick}
                                isFollowed={data.user.is_followed}
                                onToggleFollow={onToggleFollow}
                            />
                        )}
                    >
                        <div className={styles.heading}>
                            <Link to={`/@${data.user.nickname}`}>
                                <h3 className={styles.nickName}>
                                    {data.user.nickname}
                                </h3>
                            </Link>
                            {data.user.tick && (
                                <FontAwesomeIcon
                                    className={styles.accountIcon}
                                    icon={faCheckCircle}
                                />
                            )}
                            <p
                                className={styles.fullName}
                            >{`${data.user.first_name} ${data.user.last_name}`}</p>
                            <span className={styles.dot}> · </span>
                            <p className={styles.time}>
                                {data.published_at_from_now}
                            </p>
                        </div>
                    </Popper>

                    <div className={styles.postContent}>{data.description}</div>
                    {type === 'for-you' && (
                        <UserContext.Consumer>
                            {currentUser => (!(currentUser?.id === data.user.id)) && (
                                <div
                                    className={styles.followBtn}
                                    onClick={() => onToggleFollow(data)}
                                >
                                    {data.user.is_followed ? (
                                        <Button
                                            type="normal"
                                            size="s"
                                            borderColor="normalBorder"
                                        >
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
                            )}
                        </UserContext.Consumer>
                    )}
                    
                    

                    <div className={styles.musicBox}>
                        <FontAwesomeIcon
                            icon={faMusic}
                            className={styles.musicIcon}
                        />
                        <div className={styles.musicContent}>
                            <Link className={styles.musicLink} to="/"></Link>
                        </div>
                    </div>

                    <div className={styles.videoBox}>
                        {isWaypoint && (
                            <Waypoint
                                topOffset={data.computed_top_offset}
                                bottomOffset={data.computed_bottom_offset}
                                onEnter={() => onWaypointEnter(data)}
                            >
                                <div className={styles.waypoint} />
                            </Waypoint>
                        )}

                        <video
                            style={{ width: data.computed_video_width }}
                            poster={data.thumb_url}
                            className={styles.video}
                            onClick={() => onShowDetail(data)}
                            ref={(ref) => {
                                videoRef.current = ref;
                                getVideoRef(ref, data);
                            }}
                            muted={isMuted}
                            loop
                        >
                            <source
                                src={data.file_url}
                                type={data.video_mime_type}
                            />
                            Your browser does not support the video tag.
                        </video>

                        <button
                            className={[styles.ctlBtn, styles.ctlReport].join(" ")}
                            onClick={onReport}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.75 13.25L5.75 5.75C5.75 5.75 8.5 3.5 12 5.75C15.5 8 18.25 5.75 18.25 5.75V13.25C18.25 13.25 15.5 15.5 12 13.25C8.5 11 5.75 13.25 5.75 13.25ZM5.75 13.25L5.75 19.25"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                            <span>Report</span>
                        </button>

                        <button
                            className={[styles.ctlBtn, styles.ctlPlay].join(" ")}
                            onClick={() => onTogglePlay(data)}
                        >
                            <FontAwesomeIcon
                                className={styles.ctlIcon}
                                icon={isPlaying ? faPause : faPlay}
                            />
                        </button>

                        <button
                            className={[styles.ctlBtn, styles.ctlVolume].join(" ")}
                            onClick={() => onToggleMute(data)}
                        >
                            <FontAwesomeIcon
                                className={styles.ctlIcon}
                                icon={isMuted ? faVolumeMute : faVolumeUp}
                            />
                        </button>

                        <div className={styles.actionBox}>
                            <div
                                className={styles.actionItem}
                                onClick={() => onToggleLike(data)}
                            >
                                <div
                                    className={[
                                        styles.actionIcon,
                                        data.is_liked ? styles.liked : "",
                                    ].join(" ")}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={styles.icon}
                                    />
                                </div>
                                <span className={styles.reactionCount}>
                                    {data.likes_count}
                                </span>
                            </div>

                            <div
                                className={styles.actionItem}
                                onClick={() => onShowDetail(data)}
                            >
                                <div className={styles.actionIcon}>
                                    <FontAwesomeIcon
                                        icon={faCommentDots}
                                        className={styles.icon}
                                    />
                                </div>
                                <span className={styles.reactionCount}>
                                    {data.comments_count}
                                </span>
                            </div>

                            <Popper
                                placement="top"
                                interactive
                                offset={[92, 16]}
                                delay={[0, 400]}
                                render={() => 
                                <SharePreview
                                    postUrl={postUrl}
                                    onCopyVideoUrl={onCopyVideoUrl}
                                    onShareWhatsapp={onShareWhatsapp}
                                    onShareFacebook={onShareFacebook}
                                    onShareTwitter={onShareTwitter}
                                />}
                            >
                                <div
                                    className={styles.actionItem}
                                    onClick={onShare}
                                >
                                    <div className={styles.actionIcon}>
                                        <FontAwesomeIcon
                                            icon={faShare}
                                            className={styles.icon}
                                        />
                                    </div>
                                    <span className={styles.reactionCount}>
                                        {data.shares_count}
                                    </span>
                                </div>
                            </Popper>
                        </div>
                    </div>
                </div>
            </div>
        </Component>
    );
}

export default PostItem;
