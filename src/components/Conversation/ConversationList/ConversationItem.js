import styles from './ConversationList.module.scss'

function ConversationItem() {
    return (
        <div className={styles.conversationItem}>
            <div className={styles.info}>
                <div className={styles.avatar}>
                    <img src="https://tiktok.f8team.dev/storage/users/10/Lgcm4zvYfUwLCi4KqZ903seFPrh9deMpDY8sDoiT.jpg" alt="" />
                </div>
                <div className={styles.content}>
                    <p className={styles.nickname}>
                        Đào Minh Đức
                    </p>
                    <p className={styles.extract}>
                        <span className={styles.currentMessage}>Hello</span>
                        <span className={styles.time}>8:40pm</span>
                    </p>
                </div>
                <div className={styles.option}>
                    <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/more-action-icon-7aa6a63b2bf63cb69ec0aba5635da033.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default ConversationItem