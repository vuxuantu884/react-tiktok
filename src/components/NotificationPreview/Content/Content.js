import styles from './Content.module.scss'

function Content({
    children = null,
}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default Content
