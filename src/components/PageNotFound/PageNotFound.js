
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import Button from '~/packages/ducdm-button'
import styles from './PageNotFound.module.scss'

function PageNotFound() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.statusCode}>
                    <span>4</span>
                    <img className={styles.img} src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/404_face_icon-dc432020df235d848f4b552556cb72f9.png" alt=""/>
                    <span>4</span>
            </h1>
            <p className={styles.desc}>Couldn't find this page</p>
            <p className={styles.recommend}>Check out more trending videos on TikTok</p>
            <Button href="/" size="xl" type="primary" className={styles.watchNow}>
                <FontAwesomeIcon
                    icon={faPlay}
                    className={styles.watchIcon}
                />
                <span>Watch now</span>
            </Button>
        </div>
    )
}

export default PageNotFound