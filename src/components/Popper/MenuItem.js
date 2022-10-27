import { Link } from 'react-router-dom'

import styles from './Popper.module.scss'

const defaultFn = () => {}

function MenuItem({
    to = '',
    icon = null,
    children = null,
    seperate = false,
    onClick = defaultFn,
}) {
    let Component = 'div'
    const props = {}
    if (to) {
        Component = Link
        props.to = to
    }
    return (
        <Component
            {...props}
            className={[styles.menuItem, seperate ? styles.seperate : ''].join(' ')}
            onClick={onClick}
        >
            {icon && (
                <span className={styles.icon}>{icon}</span>
            )}
            <span>{children}</span>
        </Component>
    )
}

export default MenuItem
