import { Link } from 'react-router-dom'

import styles from './MoreFooterPreview.module.scss'

function OptionHeaderPreview() {
    return (
        <div className={styles.wrapper}>
            <Link to="/" className={styles.optionItem}>
                TikTok Platform Cookie Policy
            </Link>
            <Link to="/" className={styles.optionItem}>
                Intellectual Property Policy
            </Link>
            <Link to="/" className={styles.optionItem}>
                Law Enforcement Guidelines
            </Link>
        </div>
    )
}

export default OptionHeaderPreview