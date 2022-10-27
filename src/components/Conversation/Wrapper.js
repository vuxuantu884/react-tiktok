import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import styles from './Conversation.module.scss'

function Wrapper({
    children = null,
}) {
    return (
        <div className={styles.wrapper}>
            {/* Button chuyển hướng về trang trước*/}
            <button className={styles.backBtn} onClick={() => { }}>
                <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
            </button>
            {/* Phần thân Modal */}
            <div className={styles.inner}>
                {/* children sẽ được truyền vào gồm [<ConversationList />, <ConversationBox />] */}
                {children}

            </div>
        </div>
    )
}

export default Wrapper