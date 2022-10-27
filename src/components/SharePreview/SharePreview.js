import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
    faWhatsapp,
    faFacebook,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'


import styles from './SharePreview.module.scss'

const defaultFn = () => {};

function AccountPreview({
    postUrl,
    onCopyVideoUrl = defaultFn,
    onShareWhatsapp = defaultFn,
    onShareFacebook = defaultFn,
    onShareTwitter = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <div onClick={() => onShareTwitter(postUrl)} className={styles.shareItem}>
                <div className={[styles.shareBox, styles.twitter].join(' ')}>
                    <FontAwesomeIcon className={styles.shareIcon} icon={faTwitter} />
                </div>
                <span className={styles.shareText}>Share to Twitter</span>
            </div>
            <div onClick={() => onShareFacebook(postUrl)} className={styles.shareItem}>
                <div className={[styles.shareBox, styles.facebook].join(' ')}>
                    <FontAwesomeIcon className={styles.shareIcon} icon={faFacebook} />
                </div>
                <span className={styles.shareText}>Share to Facebook</span>
            </div>
            <div onClick={() => onShareWhatsapp(postUrl)} className={styles.shareItem}>
                <div className={[styles.shareBox, styles.whatsapp].join(' ')}>
                    <FontAwesomeIcon className={styles.shareIcon} icon={faWhatsapp} />
                </div>
                <span className={styles.shareText}>Share to Whatsapp</span>
            </div>
            <div onClick={() => onCopyVideoUrl(postUrl)} className={styles.shareItem}>
                <div className={[styles.shareBox, styles.link].join(' ')}>
                    <FontAwesomeIcon className={styles.shareIcon} icon={faLink} />
                </div>
                <span className={styles.shareText}>Copy link</span>
            </div>
        </div>
    )
}

export default AccountPreview