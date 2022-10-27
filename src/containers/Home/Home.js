import { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"
import LoadingBar from 'react-top-loading-bar'

import Post from "~/entities/Post"
import PostItem from "~/components/PostItem"
import PostDetailModal from "~/containers/PostDetailModal/Loadable"
import BrowserHeading from "~/components/PostDetail/BrowserHeading"
import storage from "~/utils/storage"
import config from "~/config"

const NEXT_POST = "NEXT_POST"
const PREV_POST = "PREV_POST"

function Home({type = 'for-you'}) {
    const { videoId } = useParams('')
    const [postDetail, setPostDetail] = useState(null)
    const [posts, setPosts] = useState([])
    const [progress, setProgress] = useState(0)
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })
    const [currentPost, setCurrentPost] = useState(null)
    const [postInViewport, setPostInViewport] = useState(null)
    const [isMuted, setIsMuted] = useState(storage.get("isMuted", true))

    const videoRefs = useRef({})
    const currentTimeVideoRef = useRef(null)
    const stopWhenPaused = useRef(true)

    useEffect(() => {
        // Get Post
        axios
            .get(`/api/posts?type=${type}&page=${pagination.currentPage}&except=${videoId}`)
            .then((res) => {
                setPosts((prevState) => [
                    ...prevState,
                    ...Post.createFromList(res.data)
                ])

                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })
                setProgress(100)
            })
        
            .catch((err) => {});
        
        // Get A Post 
        if(videoId) {
            axios.get(`/api/posts/${videoId}`)
            .then(res => {
                setPostDetail(Post.create(res.data))
            })
            .catch(err => {

            })
        }
    }, [pagination.currentPage, type, videoId]);

    useEffect(() => {
        // Disabled restore scrolled by user
        window.history.scrollRestoration = "manual"

        return () => {
            // Enabled restore scrolled by user
            window.history.scrollRestoration = "auto"
        };
    }, []);

    const getVideoRefByPostId = (postId) => {
        return videoRefs.current[postId]
    };

    const getCurrentPostIndex = () => {
        return posts.findIndex((post) => post.id === currentPost.id)
    };

    const setVideoRefByPostId = (postId, ref) => {
        return (videoRefs.current[postId] = ref)
    };

    const getPostUrl = (post) => {
        return `${config.routes.base}/@${post.user.nickname}/video/${post.uuid}`
    };

    const handleShowDetailPost = (post) => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.pause()
            currentTimeVideoRef.current = videoRef.currentTime;
        }
        setCurrentPost(post)
        window.history.pushState(null, document.title, getPostUrl(post))
    };

    const handleCloseDetailPost = (currentTime) => {
        
        const videoRef = getVideoRefByPostId(currentPost.id);
        videoRef.currentTime = currentTime + 0.25
        if (videoRef && postInViewport) {
            setPostInViewport(currentPost)
            videoRef.play()
        } else {
            videoRef.pause()
        }
        
        window.history.back()
        setCurrentPost(null)
    };

    const handleVideoRef = (ref, post) => {
        setVideoRefByPostId(post.id, ref)
    };

    const handleWaypointEnter = (post) => {
        if (currentPost) return
        setPostInViewport(post)
        stopWhenPaused.current = true
    };

    const checkPlaying = (post) => {
        return postInViewport && postInViewport.id === post.id
    };

    const createChangePost = (type) => {
        return () => {
            currentTimeVideoRef.current = 0;
            const currentIndex = getCurrentPostIndex();
            let newPost;
            if (type === NEXT_POST) {
                newPost = posts[currentIndex + 1]
            }

            if (type === PREV_POST) {
                newPost = posts[currentIndex - 1]
            }
            setCurrentPost(newPost);
            scrollPostIntoView(newPost)
        };
    };

    const scrollPostIntoView = useCallback((post) => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.scrollIntoView({ block: "center" })
        }
    }, []);

    useEffect(() => {
        if (!currentPost) return;
        scrollPostIntoView(currentPost)
        window.history.replaceState(
            null,
            document.title,
            getPostUrl(currentPost)
        );
    }, [currentPost, scrollPostIntoView])

    if (!posts) {
        return <h2>Loading....</h2>
    }

    const handleTogglePlay = (post) => {
        stopWhenPaused.current = false
        if (checkPlaying(post)) {
            setPostInViewport(null)
        } else {
            setPostInViewport(post)
        }
    };

    const handleToggleMute = (post) => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.muted = !videoRef.muted
            setIsMuted(videoRef.muted)
            storage.set("isMuted", videoRef.muted)
        }
    };

    const handleToggleLike = (post) => {
        let apiPath = `/api/posts/${post.id}/like`
        if (post.is_liked) apiPath = `/api/posts/${post.id}/unlike`

        axios
            .post(apiPath)
            .then((res) => {
                const index = posts.findIndex((item) => item.id === post.id)
                const newPost = Post.create(res.data)

                const newPosts = posts.slice(0)
                newPosts.splice(index, 1, newPost)

                setPosts(newPosts)
                if (currentPost) setCurrentPost(newPost)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const handleToggleFollow = (post) => {
        let apiPath = `/api/users/${post.user_id}/follow`
        if (post.user.is_followed)
            apiPath = `/api/users/${post.user_id}/unfollow`

        axios
            .post(apiPath)
            .then((res) => {
                const newPosts = posts.slice(0)

                newPosts.forEach((newPost) => {
                    if (newPost.user_id === post.user_id) {
                        newPost.user = res.data;
                    }
                });
                setPosts(newPosts);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    const handleCopyVideoUrl = (currentUrl) => {
        window.navigator.clipboard.writeText(currentUrl)
    }

    const handleShareWhatsapp = (currentUrl) => {
        window.open(config.socials.shares.whatsapp(currentUrl))
    }

    const handleShareFacebook = (currentUrl) => {
        window.open(config.socials.shares.facebook(currentUrl))
    }

    const handleShareTwitter = (currentUrl) => {
        window.open(config.socials.shares.twitter(currentUrl))
    }

    const handleLoadMore = () => {
        if (
            posts.length >= pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination({
                currentPage: pagination.currentPage + 1
            })
        }
    }
    
    return (
        <> 
        {postDetail && (
            <>
                
                <PostItem
                    key={postDetail.id}
                    data={postDetail}
                    type={type}
                    isWaypoint
                    separate={false}
                    stopWhenPaused={stopWhenPaused.current}
                    isMuted={isMuted}
                    isPlaying={checkPlaying(postDetail)}
                    onTogglePlay={handleTogglePlay}
                    onToggleMute={handleToggleMute}
                    getVideoRef={handleVideoRef}
                    onWaypointEnter={handleWaypointEnter}
                    onShowDetail={handleShowDetailPost}
                    onToggleLike={handleToggleLike}
                    onToggleFollow={handleToggleFollow}
                    onCopyVideoUrl={handleCopyVideoUrl}
                    onShareWhatsapp={handleShareWhatsapp}
                    onShareFacebook={handleShareFacebook}
                    onShareTwitter={handleShareTwitter}
                />
                <BrowserHeading title="Browse more For You videos" />
            </>
            )}

                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
            {posts.map((post, index) => (
                <PostItem
                    key={post.id}
                    data={post}
                    type={type}
                    postUrl={`${window.location.href}/@${post.user.nickname}/video/${post.uuid}`}
                    isWaypoint
                    isLast={posts.length - 1 === index}
                    stopWhenPaused={stopWhenPaused.current}
                    isMuted={isMuted}
                    isPlaying={checkPlaying(post)}
                    onTogglePlay={handleTogglePlay}
                    onToggleMute={handleToggleMute}
                    getVideoRef={handleVideoRef}
                    onWaypointEnter={handleWaypointEnter}
                    onShowDetail={handleShowDetailPost}
                    onToggleLike={handleToggleLike}
                    onToggleFollow={handleToggleFollow}
                    onCopyVideoUrl={handleCopyVideoUrl}
                    onShareWhatsapp={handleShareWhatsapp}
                    onShareFacebook={handleShareFacebook}
                    onShareTwitter={handleShareTwitter}
                    
                    onLastEnter={handleLoadMore}
                />
            ))}
            {currentPost && (
                <PostDetailModal
                    data={currentPost}
                    videoId={currentPost.id}
                    userId={currentPost.user_id}
                    currentTime={currentTimeVideoRef.current}
                    showNext={getCurrentPostIndex() < posts.length - 1}
                    showPrev={getCurrentPostIndex() > 0}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                    onToggleLike={handleToggleLike}
                    onToggleFollow={handleToggleFollow}
                    onRequestClose={handleCloseDetailPost}
                    onPrev={createChangePost(PREV_POST)}
                    onNext={createChangePost(NEXT_POST)}
                />
            )}
        </>
    );
}

export default Home;
