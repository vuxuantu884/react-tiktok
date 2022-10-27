import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import styles from '~/components/MainSidebar/MainSidebar.module.scss'

function MainSidebar({ children = null }) {

    return (
        <OverlayScrollbarsComponent
            className={styles.wrapper}
            options={{
                className: "os-theme-dark",
                scrollbars: {
                    autoHide: 'leave',
                    autoHideDelay: 50,
                },
            }}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}

export default MainSidebar
