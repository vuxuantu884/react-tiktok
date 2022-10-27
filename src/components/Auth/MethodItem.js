import styles from './Auth.module.scss'

const defaultFn = () => { }

function MethodItem({
    icon = null,
    title = '',
    onClick = defaultFn,
}) {
    return (
        <div className={styles.methodItem} onClick={onClick}>
            <div className={styles.methodIcon}>
                {icon}
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
            </div>
        </div>
    )
}

export default MethodItem
