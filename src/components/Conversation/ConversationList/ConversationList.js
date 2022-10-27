import styles from './ConversationList.module.scss'

function ConversationList({
    children = null
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Messages</h3>
                    <img className={styles.settingIcon} src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/setting-icon-a9c23d78ffb500df10b32dbcc6aa9b5e.svg" alt="" />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>

        </div>

    )
}

export default ConversationList