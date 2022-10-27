import styles from './NotificationPreview.module.scss'

function NotificationPreview({
    children = null
}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default NotificationPreview