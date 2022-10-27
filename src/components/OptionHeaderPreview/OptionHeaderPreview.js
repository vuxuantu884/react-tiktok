import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLanguage,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'

import styles from './OptionHeaderPreview.module.scss'

function OptionHeaderPreview() {
    return (
        <div className={styles.wrapper}>
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
        </div>
    )
}

export default OptionHeaderPreview