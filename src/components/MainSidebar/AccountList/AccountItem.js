import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Waypoint } from 'react-waypoint';

import styles from './AccountList.module.scss'

function AccountItem({
    avatar = '',
    title = '',
    desc = '',
    linkTo = '',
    tick = false,
    isLast = false,
    onLastEnter = () => { },
}) {

    const props = {}
    let Component = Fragment
    if (isLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }

    return (
        <Component {...props}>
            <Link to={linkTo} className={styles.AccountItem}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                </div>

                <div className={styles.accountBody}>
                    <div className={styles.accountTitle}>
                        <h3 className={styles.accountHeading}>{title}</h3>
                        {tick ? <FontAwesomeIcon className={styles.accountIcon} icon={faCheckCircle} /> : ''}
                    </div>
                    <p className={styles.accountDesc}>{desc}</p>
                </div>
            </Link>
        </Component>
    )
}

export default AccountItem