import UserContext from '~/contexts/UserContext'
import styles from './PostDetail.module.scss'

const defaultFn = () => { }

function Content({
    children = null,
    commentText = '',
    onChangeText = defaultFn,
    onComment = defaultFn,
}) {
    return (
        <div className={styles.postContent}>
            {/* children được truyền vào bao gồm: [<PostInfo /> <Comment />] */}
            {children}
            <UserContext.Consumer>
                {(currentUser) => (
                    currentUser && (
                <div className={styles.commentPost}>
                    <div className={styles.editor}>
                        <input
                            className={styles.input}
                            value={commentText}
                            onChange={(e) => onChangeText(e.target.value)}
                            onKeyPress={() => window.event.keyCode === 13 && onComment()}
                            type="text"
                            placeholder="Add comment..."
                        />
                        <div
                        className={[styles.sendBtn, commentText && styles.sending].join(' ')}
                        
                        onClick={onComment}>
                            Post
                        </div>
                    </div>
                </div>))}
             </UserContext.Consumer>
        </div>
    )
}

export default Content