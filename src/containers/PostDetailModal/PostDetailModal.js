import { useState, useEffect, useRef } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import CommentEntity from "~/entities/Comment"
import { Row, Column } from "@mycv/mycv-grid"
import {
    Wrapper,
    Content,
    VideoPlayer,
    PostInfo,
    Comment,
    CommentItem,
} from "~/components/PostDetailModal"
import config from "~/config"
import axios from "axios"

const defaultFn = () => {};

function PostDetail({
    data,
    userId,
    currentTime,
    showNext,
    showPrev,
    isMuted,
    onToggleMute = defaultFn,
    onToggleLike = defaultFn,
    onToggleFollow = defaultFn,
    onRequestClose = defaultFn,
    onNext = defaultFn,
    onPrev = defaultFn,
}) {
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")
    const [isPlaying, setIsPlaying] = useState(true)
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })
    useEffect(() => {
        disableBodyScroll(document.body)
        return () => {
            enableBodyScroll(document.body)
        };
    }, []);

    useEffect(() => {
        axios
            .get(`/api/posts/${data.id}/comments?page=${pagination.currentPage}`)
            .then((res) => {
                setComments((prevState) => [
                    ...prevState,
                    ...CommentEntity.createFromList(res.data)
                ])

                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })
            })

            .catch((err) => {});
    }, [data.id, pagination.currentPage]);
    const currentUrl = window.location.href;
    const videoRef = useRef(null);

    const handleCopyVideoUrl = (value) => {
        window.navigator.clipboard.writeText(value)
    };

    const handleShareWhatsapp = () => {
        window.open(config.socials.shares.whatsapp(currentUrl));
    };

    const handleShareFacebook = () => {
        window.open(config.socials.shares.facebook(currentUrl));
    };

    const handleShareTwitter = () => {
        window.open(config.socials.shares.twitter(currentUrl));
    };

    const handleVideoRef = (ref) => {
        if (ref) {
            videoRef.current = ref;
            if (isPlaying) {
                videoRef.current.play();
            }
            const newVideoRef = videoRef.current.currentTime;
            if (newVideoRef) return;
            videoRef.current.currentTime = currentTime;
        }
    };

    const handleRequestClose = () => {
        onRequestClose(videoRef.current.currentTime);
    };

    const handleComment = () => {
        if (!commentText) return;
        axios
            .post(`/api/posts/${data.id}/comments`, { comment: commentText })
            .then((res) => {
                setComments((prevState) => [res.data, ...prevState]);
                setCommentText("")
            })

            .catch((err) => {
                console.error(err);
            });
    };

    const handleTogglePlay = () => {
        if (videoRef) {
            setIsPlaying(!isPlaying)
        }
    }

    const handleLoadMore = () => {
        if (
            comments.length >= pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination({
                currentPage: pagination.currentPage + 1
            })
        }
    }

    return (
        <Wrapper onRequestClose={handleRequestClose}>
            <Row noGutters>
                <Column size={8}>
                    <VideoPlayer
                        post={data}
                        getVideoRef={handleVideoRef}
                        showNext={showNext}
                        showPrev={showPrev}
                        isMuted={isMuted}
                        isPlaying={isPlaying}
                        onNext={() => {
                            onNext()
                            // setPagination({
                            //     currentPage: 1
                            // })
                        }}
                        onPrev={() => {
                            onPrev()
                            // setPagination({
                            //     currentPage: 1
                            // })
                        }}
                        onToggleMute={onToggleMute}
                        onTogglePlay={handleTogglePlay}
                    />
                </Column>

                <Column size={4}>
                    <Content
                        commentText={commentText}
                        onComment={handleComment}
                        onChangeText={setCommentText}
                    >
                        <PostInfo
                            post={data}
                            musicContent="Alone (ITLM Remix) - Trọng Hiếu"
                            onToggleLike={onToggleLike}
                            onToggleFollow={onToggleFollow}
                            onCopyVideoUrl={handleCopyVideoUrl}
                            onShareWhatsapp={handleShareWhatsapp}
                            onShareFacebook={handleShareFacebook}
                            onShareTwitter={handleShareTwitter}
                        />
                        <Comment>
                            {comments.map((comment, index) => (
                                <CommentItem
                                    userId={userId}
                                    key={comment.id}
                                    data={comment}
                                    isLast={comments.length - 1 === index}
                                    onLastEnter={handleLoadMore}
                                />
                            ))}
                        </Comment>
                    </Content>
                </Column>
            </Row>
        </Wrapper>
    );
}

export default PostDetail;
