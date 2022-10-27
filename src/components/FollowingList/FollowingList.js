import styles from './FollowingList.module.scss'

function FollowingList({
    children = null,
}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default FollowingList