import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLanguage,
    faQuestionCircle,
    faUser,
    faCog,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import styles from './UserHeaderPreview.module.scss'

const defaultFn = () => { }

function UserHeaderPreview({
    nickName,
    onLogOut = defaultFn
}) {
    return (
        <div className={styles.wrapper}>
            <Link to={`/@${nickName}`} className={styles.optionItem}>
                <div className={styles.optionBox}>
                    <FontAwesomeIcon className={styles.optionIcon} icon={faUser} />
                </div>
                <span className={styles.optionText}>View profile</span>
            </Link>
            <Link to="/" className={styles.optionItem}>
                <div className={styles.optionBox}>
                    <FontAwesomeIcon className={styles.optionIcon} icon={faCog} />
                </div>
                <span className={styles.optionText}>Settings</span>
            </Link>
            <div className={styles.optionItem}>
                <div className={styles.optionBox}>
                    <FontAwesomeIcon className={styles.optionIcon} icon={faLanguage} />
                </div>
                <span className={styles.optionText}>EngLish</span>
            </div>
            <Link to="/" className={styles.optionItem}>
                <div className={styles.optionBox}>
                    <FontAwesomeIcon className={styles.optionIcon} icon={faQuestionCircle} />
                </div>
                <span className={styles.optionText}>Feedback and help</span>
            </Link>
            <hr className={styles.logoutLine} />
            <div className={styles.optionItem} onClick={onLogOut}>
                <div className={styles.optionBox}>
                    <FontAwesomeIcon className={styles.optionIcon} icon={faSignOutAlt} />
                </div>
                <span className={styles.optionText}>Log out</span>
            </div>
        </div>
    )
}

export default UserHeaderPreview