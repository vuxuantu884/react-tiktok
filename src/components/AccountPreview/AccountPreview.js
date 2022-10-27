import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Button from '~/packages/ducdm-button'
import styles from './AccountPreview.module.scss'

function AccountPreview({
    data,
    avatar = '',
    title = '',
    desc = '',
    followersCount = 0,
    likesCount = 0,
    linkTo = '',
    tick = false,
    isFollowed = false,
    onToggleFollow = false
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Link to={linkTo}>
                        <img src={avatar} alt={title} title={`${desc} (@${title}) | TikTok`} />
                    </Link>
                </div>
                <div className={styles.info}>
                    <Link to={linkTo}>
                        <h3 className={styles.infoTitle}>
                            {title}
                            {tick && (
                                <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                            )}
                        </h3>
                    </Link>
                    <Link to={linkTo}>
                        <h4 className={styles.infoDesc}>{desc}</h4>
                    </Link>
                </div>
                <div className={styles.followBtn} onClick={() => onToggleFollow(data)}>
                    {isFollowed ? (
                        <Button 
                            type="border"
                            size="s"
                        >
                            Following
                        </Button>) : (
                        <Button
                            type="border"
                            textColor="primaryText"
                            borderColor="primaryBorder"
                            color="primaryColor"
                            size="s"
                        >
                            Follow
                        </Button>
                    )}
                </div>


            </div>
            <div className={styles.interactive}>
                <div className={styles.followersCount}>
                    <span className={styles.quantity}>
                        {followersCount}
                    </span>
                    <span className={styles.text}>
                        Followers
                    </span>
                </div>
                <div className={styles.likesCount}>
                    <strong className={styles.quantity}>
                        {likesCount}
                    </strong>
                    <span className={styles.text}>
                        Likes
                    </span>
                </div>


            </div>
        </div>
    )
}

export default AccountPreview