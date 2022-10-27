
import styles from './Tab.module.scss'

const defaultFn = () => { }

function TabItem({
    isOpen = false,
    tabName = '',
    onClick = defaultFn
}) {
    return (
        <p className={[styles.tabItem, isOpen && styles.active].join(' ')} onClick={onClick}>
            <span className={styles.tabName}>{tabName}</span>
        </p>
    )
}

export default TabItem