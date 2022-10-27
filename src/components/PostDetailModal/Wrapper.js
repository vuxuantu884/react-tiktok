import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './PostDetail.module.scss'

function Wrapper({
    children = null,
    onRequestClose = () => { }
}) {

    return (
        // Thẻ bao bọc, đóng vai trò làm Modal luôn
        <div className={styles.wrapper}>
            {/* Button đóng Modal */}
            <button className={styles.closeBtn} onClick={onRequestClose}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
            </button>
            <img className={styles.logoIcon} src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/logo-441371124b15403175a080da9df31116.png" alt="" />
            {/* Phần thân Modal */}
            <div className={styles.inner}>
                {/* children sẽ được truyền vào gồm [<VideoPlayer />, <Content />] */}
                {children}

            </div>
        </div >
    )
}

export default Wrapper