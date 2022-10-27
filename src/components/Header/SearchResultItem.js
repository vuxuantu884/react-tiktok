import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'

function SearchResultItem({
    linkTo = '',
    nickname = '',
    name = '',
    tick = false,
    onClick = () => {
    }
}) {
    return (
        <Link onClick={onClick} to={linkTo}>
            <div className={styles.searchResultItem}>
                <h3 className={styles.nameResult}>{nickname}</h3>
                {tick ? <FontAwesomeIcon className={styles.tickResult} icon={faCheckCircle} /> : ''}
                <p className={styles.descResult}>{name}</p>
            </div>
        </Link>
    )
}

export default SearchResultItem