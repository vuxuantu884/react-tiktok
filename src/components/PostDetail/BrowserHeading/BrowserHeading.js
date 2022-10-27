import styles from './BrowserHeading.module.scss'

function BrowserHeading({ title = '' }) {
    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
        </div>
    )
}

export default BrowserHeading
