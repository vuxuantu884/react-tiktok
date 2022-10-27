import React from 'react'

import styles from './Header.module.scss'

function Header({
    tabs,
    onChangeTab,
    currentTab=[]
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Notifications</div>
            <div className={styles.nav}>
                {
                    tabs.map(tap => 
                        <div
                            key={tap.title}
                            onClick={() => onChangeTab(tap.type)}
                            className={`${styles.tabItem} ${currentTab[0]?.type === tap.type ? styles.active : ''}`}
                        >
                            {tap.title}
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default Header
