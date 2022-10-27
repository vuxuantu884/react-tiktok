import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


import styles from './AccountList.module.scss'

function AccountList({
    heading = '',
    expandedTitle = 'See all',
    collapsedTitle = 'See less',
    collapsedHeight = 'initial',
    children = null,
    isExpanded = false,
    hideSeeBtn = false,
    onSeeToggle = () => { },
}) {

    return (
        <div className={styles.accountList}>
            <h4 className={styles.heading}>{heading}</h4>
            <div className={styles.inner} style={{ maxHeight: collapsedHeight }}>
                {children}
            </div>

            {hideSeeBtn && (
                <div onClick={onSeeToggle} className={styles.seeAllBtn}>
                    <p>{isExpanded ? collapsedTitle : expandedTitle}</p>
                    <FontAwesomeIcon className={styles.seeAllIcon} icon={isExpanded ? faChevronUp : faChevronDown} />
                </div>
            )}

        </div>
    )
}

export default AccountList