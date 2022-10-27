import Button from '~/packages/ducdm-button'
import styles from './Comment.module.scss'
import UserContext from '~/contexts/UserContext'

function Comment({
    children = null,
}) {
   return (
        <div className={styles.wrapper}>
            <UserContext.Consumer>
                {(currentUser) => (
                    currentUser ? (
                    <div className={styles.commentList}>
                        {children}
                    </div>
                    ) : (
                    <div className={styles.logoutBox}>
                        <h3 className={styles.heading}>Login to see comments</h3>
                        <p className={styles.desc}>Login to see comments and like the video.</p>
                        <Button type="primary" size="xl" >Log in</Button>
                        <p className={styles.signup}>
                            Don’t have an account?
                            <span className={styles.signupLink}>Sign up</span>
                        </p>
                    </div>
                    )
                )}
            </UserContext.Consumer>
        </div>
    )
}

export default Comment