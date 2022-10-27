import { LockIcon } from '~/packages/ducdm-icon'
import styles from './ErrorPage.module.scss'

function ErrorPage({
    userName = '',
}) {
    return (
        <div className={styles.wrapper}>
            <LockIcon />
            <p className={styles.title}>This user's liked videos are private</p>
            <p className={styles.desc}>Videos liked by {userName} are currently hidden</p>
        </div>
    )
}

export default ErrorPage