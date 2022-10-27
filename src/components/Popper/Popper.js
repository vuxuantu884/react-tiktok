import Tippy from '@tippyjs/react/headless'

import styles from './Popper.module.scss'

function Popper({
    children = null,
    render = () => { },
    delay = 0,
    minWidth = 280,
    appendTo = () => document.body,
    ...props

}) {

    return (
        <Tippy
            {...props}
            delay={delay}
            appendTo={appendTo}
            render={() => (
                <div className={styles.wrapper} style={{ minWidth }}>
                    <div className={styles.inner}>
                        {render()}
                    </div>

                </div>
            )}
        >
            <div>
                {children}
            </div>
        </Tippy>
    )
}

export default Popper
