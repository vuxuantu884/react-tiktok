import Popper from '~/components/Popper'
import MoreFooterPreview from '~/components/MoreFooterPreview'
import config from '../../../config'
import styles from './Footer.module.scss'

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.pageLinkFooter}>
                <a href={config.routes.home} className={styles.linkItem} alt="">About</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Newsroom</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Contact</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Careers</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">ByteDance</a>
            </div>
            <div className={styles.programLinkFooter}>
                <a href={config.routes.home} className={styles.linkItem} alt="">TikTok for Good</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Advertise</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Developers</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Transparency</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Help</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Safety</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Terms</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Privacy</a>
            </div>
            <div className={styles.legalLinkFooter}>
                <a href={config.routes.home} className={styles.linkItem} alt="">Creator Portal</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Community Guidelines</a>
                <a href={config.routes.home} className={styles.linkItem} alt="">Copyright</a>
            </div>
            <div className={styles.moreFooter}>
                <Popper
                    placement="top"
                    interactive
                    offset={[-16, 10]}
                    minWidth={200}
                    delay={[0, 400]}
                    render={() => (
                        <MoreFooterPreview />
                    )}
                >
                    <a href={config.routes.home} className={styles.linkItem} alt="">More</a>
                </Popper>
            </div>
            <span className={styles.copyrightFooter}>
                © 2021 TikTok
            </span>
        </div>
    )
}

export default Footer