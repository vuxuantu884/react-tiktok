
import styles from './Tab.module.scss'

const defaultFn = () => { }

function TabList({
    children = null,
    tabName = '',
    onClick = defaultFn
}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default TabList