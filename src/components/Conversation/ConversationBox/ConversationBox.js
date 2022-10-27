import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons'

import TextInput from '~/packages/ducdm-textinput'
import styles from './ConversationBox.module.scss'

function ConversationBox() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <Link to="/" className={styles.avatar}>
                        <img src="https://tiktok.f8team.dev/storage/users/10/Lgcm4zvYfUwLCi4KqZ903seFPrh9deMpDY8sDoiT.jpg" alt="" />
                    </Link>
                    <Link to="/" className={styles.info}>
                        <p className={styles.title}>
                            Đào Minh Đức
                        </p>

                        <p className={styles.desc}>
                            @minhducdevofficial
                        </p>
                    </Link>
                </div>
                <div className={styles.content}>

                    <div className={[styles.messageItem].join(' ')}>
                        <div className={styles.messageInfo}>
                            <Link to="/" className={styles.messageAvatar}>
                                <img src="https://tiktok.f8team.dev/storage/users/10/Lgcm4zvYfUwLCi4KqZ903seFPrh9deMpDY8sDoiT.jpg" alt="" />
                            </Link>
                            <div className={styles.messageText}>
                                <p>hello</p>
                            </div>
                            <div className={styles.more}>
                                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/more-action-icon-7aa6a63b2bf63cb69ec0aba5635da033.svg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className={[styles.messageItem, styles.myself].join(' ')}>
                        <div className={[styles.messageInfo, styles.myself].join(' ')}>
                            <Link to="/" className={styles.messageAvatar}>
                                <img src="https://tiktok.f8team.dev/storage/users/10/Lgcm4zvYfUwLCi4KqZ903seFPrh9deMpDY8sDoiT.jpg" alt="" />
                            </Link>
                            <div className={styles.messageText}>
                                <p>hello</p>
                            </div>
                            <div className={styles.more}>
                                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/more-action-icon-7aa6a63b2bf63cb69ec0aba5635da033.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.time}>9:40 PM</div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.editor}>
                        <TextInput className={styles.input} type="text" placeholder="Send a message..." />
                        <button className={styles.sendBtn} onClick={() => { }}>
                            <FontAwesomeIcon className={styles.sendIcon} icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox