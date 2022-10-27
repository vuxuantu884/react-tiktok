import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './SearchList.module.scss'

function SearchItem({
    avatar = '',
    title = '',
    desc = '',
    tick = false,
    followerCount = 0,
    bio = '',
    linkTo = ''
}) {
    return (
        <Link to={linkTo} className={styles.searchItem}>
            <div className={styles.avatar}>
                <img  src={avatar} alt="" />
            </div>

            <div className={styles.resultBody}>
                <p className={styles.resultTitle}>
                    {title}
                    {tick ? <FontAwesomeIcon className={styles.resultIcon} icon={faCheckCircle} /> : ''}
                </p>
                <div className={styles.subTitle}>
                    <h3 className={styles.subTitleHeading}>{desc}</h3>
                    <p className={styles.dot}> · </p> 
                    <p className={styles.subTitleContent}>{followerCount}
                        <span>Followers</span>
                    </p>
                </div>

                <p className={styles.desc}>
                    Musician/ArtistSmile and enjoy! 😉
                    {bio}
                </p>
            </div>
        </Link>
    )
}

export default SearchItem