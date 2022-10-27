import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import styles from './SearchList.module.scss'

function SearchList({
    children = null,
    hideLoadBtn = false,
    showLoadMore = () => {},
}) {

    return (
        <div className={styles.wrapper}>
            {children}

            {hideLoadBtn && (
                <p className={styles.loadMore} onClick={showLoadMore}>
                    Load More
                    <FontAwesomeIcon className={styles.loadMoreIcon} icon={faChevronDown} />
                </p>
            )}
        </div>
    )
}

export default SearchList