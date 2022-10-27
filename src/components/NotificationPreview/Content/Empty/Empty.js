import styles from './Empty.module.scss'

function Empty({
    tabName = '',
    children = null,
}) {
    return (
        <div className={styles.empty}>
            {children}
            <h4 className={styles.title}>{tabName} on your videos</h4>
            <p className={styles.desc}>When someone {tabName} one of your videos, you'll see it here</p>
        </div>
    )
}

export default Empty