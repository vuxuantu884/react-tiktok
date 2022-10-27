import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faPlay,
    faVolumeUp,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./VideoPlayer.module.scss";

const defaultFn = () => {};

function VideoPlayer({
    post,
    isMuted = false,
    isPlaying = false,
    showPrev = false,
    showNext = false,
    getVideoRef = defaultFn,
    onToggleMute = defaultFn,
    onTogglePlay = defaultFn,
    onNext = defaultFn,
    onPrev = defaultFn,
    onReport = defaultFn,
}) {
    const videoRef = useRef(null);
    useEffect(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.backgroundVideo}>
                <img src={post.thumb_url} alt="" />
            </div>

            <div className={styles.videoBox}>
                <video
                    src={post.file_url}
                    className={styles.video}
                    ref={(ref) => {
                        videoRef.current = ref;
                        getVideoRef(ref);
                    }}
                    muted={isMuted}
                    loop
                    onClick={onTogglePlay}
                />

                {/* Volume button */}
                <button
                    className={[styles.ctlBtn, styles.btnVolume].join(" ")}
                    onClick={() => onToggleMute(post)}
                >
                    <FontAwesomeIcon
                        className={styles.ctlIcon}
                        icon={isMuted ? faVolumeMute : faVolumeUp}
                    />
                </button>

                {/* Previus button */}
                {showPrev && (
                    <button
                        className={[styles.ctlBtn, styles.btnPrev].join(" ")}
                        onClick={onPrev}
                    >
                        <FontAwesomeIcon
                            className={styles.ctlIcon}
                            icon={faAngleLeft}
                        />
                    </button>
                )}

                {/* Next button */}
                {showNext && (
                    <button
                        className={[styles.ctlBtn, styles.btnNext].join(" ")}
                        onClick={onNext}
                    >
                        <FontAwesomeIcon
                            className={styles.ctlIcon}
                            icon={faAngleRight}
                        />
                    </button>
                )}

                {/* Report */}
                <button className={styles.ctlReport} onClick={onReport}>
                    <svg
                        className={styles.reportIcon}
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
                {!isPlaying && (
                    <div className={styles.playBtn} onClick={onTogglePlay}>
                        <FontAwesomeIcon
                            className={styles.playIcon}
                            icon={faPlay}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPlayer;
