import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faLink, faEllipsisH, faFlag, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { UnFollowIcon } from '~/packages/ducdm-icon'
import UserContext from '~/contexts/UserContext'
import Popper, { MenuItem } from '~/components/Popper'
import Button from '~/packages/ducdm-button'
import styles from './UserInfo.module.scss'

function UserInfo({
    userInfo = [],
    onToggleFollow = () => {},
    onReport = () => {},
}) {

    const menus = useRef([
        {
            title: 'Send message',
            icon: <FontAwesomeIcon icon={faPaperPlane} />,
            to: '/messages/?u='
        },
        {
            title: 'Report',
            icon: <FontAwesomeIcon icon={faFlag} />,
            onClick: onReport
        }
    ])
    const renderMoreMenu = () => {
        return menus.current.map((menu, index) => (
            <MenuItem
                key={index}
                to={menu.to}
                icon={menu.icon}
                seperate={index === 0}
                onClick={menu.onClick}
            >
                {menu.title}
            </MenuItem>
        ))
    }

    return (
        <div className={styles.userInfo}>
            <div className={styles.shareInfo}>
                <div className={styles.avatar}>
                    <img src={userInfo.avatar} alt="" />
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>
                        {userInfo.nickname}
                        <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                    </h1>

                    <h2 className={styles.subTitle}>
                        {`${userInfo.first_name} ${userInfo.last_name}`}
                    </h2>
                    <UserContext.Consumer>
                        {(currentUser) => !(currentUser?.id === userInfo.id) && (
                            <div className={styles.followBox}>
                                {userInfo.is_followed ? (
                            <>
                                <Button className={styles.messageBtn} to="/message" size="l" type="normal" textColor="primaryText" borderColor="primaryBorder">Message</Button>
                                <Button
                                    className={styles.unfollowBtn}
                                    type="normal"
                                    borderColor="normalBorder" 
                                    onClick={() => onToggleFollow(userInfo)}
                                >
                                    <UnFollowIcon />
                                </Button>
                            </>
                            ) :(
                                <Button
                                    size="l"
                                    type="primary"
                                    onClick={() => onToggleFollow(userInfo)}
                                >
                                    Follow
                                </Button>
                                )}
                            </div>
                        )}
                    </UserContext.Consumer>
                </div>
            </div>

            <div className={styles.countInfo}>
                <div className={styles.followingCount}>
                    <strong className={styles.quantity}>
                        {userInfo.followings_count}
                    </strong>
                    <span>
                        Following
                    </span>
                </div>
                <div className={styles.followerCount}>
                    <strong className={styles.quantity}>
                        {userInfo.followers_count}
                    </strong>
                    <span>
                        Followers
                    </span>
                </div>
                <div className={styles.likeCount}>
                    <strong className={styles.quantity}>
                        {userInfo.likes_count}
                    </strong>
                    <span>
                        Likes
                    </span>
                </div>
            </div>

            <h2 className={styles.shareDesc}>
                {userInfo.bio ? userInfo.bio : 'No bio yet'} 😉
            </h2>

            <div className={styles.shareLink}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faLink} />
                <a href="www.facebook.com/tronghieufanpage" alt="Facebook" className={styles.link}>
                    www.facebook.com/tronghieufanpage
                </a>
            </div>

            <div className={styles.moreAction}>
            <Popper
                        interactive
                        wrapperClassname={styles.menuWrapper}
                        render={renderMoreMenu}
                        appendTo="parent"
                        placement="bottom"
                        offset={[-80, 0]}
                        minWidth={200}
                        delay={[0, 300]}
                    >
                        <FontAwesomeIcon className={styles.moreIcon} icon={faEllipsisH} />
                    </Popper>
            </div>
        </div>
    )
}

export default UserInfo