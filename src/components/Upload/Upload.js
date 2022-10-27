import { Row, Column } from '@mycv/mycv-grid'

import styles from './Upload.module.scss'
import Button from '~/packages/ducdm-button'

function Upload() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Upload video</h1>
                    <p className={styles.description}>This video will be published to @minhducdevofficial</p>
                </div>
                <div className={styles.content}>
                    <Row>
                        <Column sizeDesktop={4}>
                            <div className={styles.operation}>
                                <div className={styles.upload}>
                                    <div className={styles.uploadBtn}>
                                        <div className={styles.card}>
                                            <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/cloud_icon-6e07be44878e69ee3f7bff3b78405b76.svg" width={49} className={styles.uploadIcon} alt="" />
                                            <h3 className={styles.title}>Select video to upload</h3>
                                            <p className={styles.subTitle}>Or drag and drop a file</p>
                                            <br />
                                            <ul className={styles.requirementList}>
                                                <li className={styles.requirementItem}>
                                                    MP4 or WebM
                                                </li>
                                                <li className={styles.requirementItem}>
                                                    720x1280 resolution or higher
                                                </li>
                                                <li className={styles.requirementItem}>
                                                    Up to 180 seconds
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="file" name="upload-btn" accept="video/mp4,video/x-m4v,video/*" className={styles.uploadInput} title="" />
                                    </div>
                                </div>
                            </div>
                        </Column>
                        <Column sizeDesktop={8}>
                            <div className={styles.form}>
                                <div className={styles.caption}>
                                    <div className={styles.text}>
                                        <span className={styles.title}>Caption</span>
                                        <span className={styles.requireCharacters}>0/150</span>
                                    </div>
                                    <div className={styles.editor}>
                                        <input type="text" placeholder="hello" className={styles.textInput} />

                                        <div className={[styles.icon, styles.iconTag].join(' ')}>
                                            <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/at-e6af58d8bb2f7b922636edfb09c5d65c.svg" alt="" />
                                        </div>
                                        <div className={[styles.icon, styles.iconHash].join(' ')}>
                                            <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/hashtag-bb2d9e1eaf7b50e3752a07702f3bac84.svg" alt="" />
                                        </div>
                                    </div>

                                </div>

                                <div className={styles.cover}>
                                    <div className={styles.text}>
                                        <span className={styles.title}>Cover</span>
                                    </div>

                                    <div className={styles.coverList}>
                                        {/* <div className={[styles.candidate, styles.empty].join(' ')}>

                                        </div> */}
                                        <img className={styles.candidate} src="https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/d58fe7df6f2d4d93a828f538b4b354a6_1619109748?x-expires=1619985600&x-signature=JeiF4aITqoZ%2FAjkCpeeDBqbgZeA%3D" alt="" />
                                        <img className={styles.candidate} src="https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/d58fe7df6f2d4d93a828f538b4b354a6_1619109748?x-expires=1619985600&x-signature=JeiF4aITqoZ%2FAjkCpeeDBqbgZeA%3D" alt="" />

                                    </div>
                                </div>

                                <div className={styles.selector}>
                                    <div className={styles.permission}>
                                        <div className={styles.title}>
                                            Who can view this video
                                        </div>

                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioItem}>
                                                <input type="radio" value="0" />
                                                <span className={[styles.radioBox, styles.checked].join(' ')}></span>
                                            Public
                                            </label>
                                            <label className={styles.radioItem}>
                                                <input type="radio" value="0" />
                                                <span className={[styles.radioBox, styles.checked].join(' ')}></span>
                                            Friends
                                            </label>
                                            <label className={styles.radioItem}>
                                                <input type="radio" value="0" />
                                                <span className={[styles.radioBox, styles.checked].join(' ')}></span>
                                            Private
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.permission}>
                                        <div className={styles.title}>
                                            Allow users to:
                                        </div>
                                        <div className={styles.checkboxGroup}>
                                            <label className={styles.checkboxItem}>
                                                <input type="checkbox" value="0" />
                                                <span className={[styles.checkboxBox, styles.checked].join(' ')}></span>
                                            Comment
                                            </label>
                                            <label className={styles.checkboxItem}>
                                                <input type="checkbox" value="0" />
                                                <span className={[styles.checkboxBox, styles.checked].join(' ')}></span>
                                            Duet/React
                                            </label>
                                            <label className={styles.checkboxItem}>
                                                <input type="checkbox" value="0" />
                                                <span className={[styles.checkboxBox].join(' ')}></span>
                                            Stitch
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.post}>
                                    <Button
                                        type="normal"
                                        size="l"
                                    >
                                        Discard
                                </Button>
                                    <Button
                                        type="primary"
                                        size="l"
                                        disabled
                                    >
                                        Post
                                </Button>
                                </div>
                            </div>
                        </Column>
                    </Row>
                </div>
            </div>

        </div >
    )
}

export default Upload
