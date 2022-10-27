import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import styles from './Auth.module.scss'

const defaultFn = () => { }

function Footer({
    text = '',
    actionTitle = '',
    onAction = defaultFn,
}) {
    return (
        <div className={styles.footer}>
            <div className={styles.toggleIsModal}>
                <p className={styles.text} onClick={onAction}>{text} <span>{actionTitle}</span></p>

            </div>
            <Link to="/" className={styles.questionBtn}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faQuestionCircle} />
            </Link>
        </div>
    )
}

export default Footer
