import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


import styles from './Auth.module.scss'

const defaultFn = () => { }

function Wrapper({
    children = null,
    heading = '',
    renderFooter = () => null,
    showBackBtn = false,
    onBack = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>{heading}</h2>

            {showBackBtn && (
                <button className={styles.backBtn} onClick={onBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} />
                </button>
            )}

            <div className={styles.body}>
                <div className={styles.methodList}>
                    {children}
                </div>
            </div>
            {renderFooter()}
        </div>

    )
}

export default Wrapper
