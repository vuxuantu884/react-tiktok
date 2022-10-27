import styles from './ProfileDetail.module.scss'

function ProfileDetail({
    children = null,
}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default ProfileDetail