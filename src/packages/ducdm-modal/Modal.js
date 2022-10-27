import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.scss'

const defaultFn = () => { }

function Modal({
    isOpen = false,
    shouldCloseOnOverlayClick = true,
    children = null,
    className = '',
    bodyClassName = '',
    width = 0,
    height = 0,
    onRequestClose = defaultFn
}) {
    if (!isOpen) {
        return null
    }
    return (
        <div className={[styles.wrapper, className].join(' ')}>
            <div
                className={styles.overlay}
                onClick={shouldCloseOnOverlayClick ? onRequestClose : defaultFn}
            />

            <div className={styles.body} style={{ width: width, height: height }}>
                <button

                    className={[styles.closeBtn, bodyClassName].join(' ')}
                    onClick={onRequestClose}
                >
                    <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal
