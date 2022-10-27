import { Grid } from "@mycv/mycv-grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEllipsisV,
    faSearch,
    faTimesCircle,
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

import SearchPreview from "~/components/SearchPreview"
import OptionHeaderPreview from "components/OptionHeaderPreview"
import Notification from '~/modules/Notification'
import UserHeaderPreview from "components/UserHeaderPreview"
import { UploadIcon, MessageIcon, InboxIcon } from "~/packages/ducdm-icon"
import Popper from "~/components/Popper"
import UserContext from "~/contexts/UserContext"
import Tooltip from "~/components/Tooltip"
import Button from "~/packages/ducdm-button"
import logoDark from "~/assets/img/logo-dark.svg"
import logoTextDark from "~/assets/img/logo-text-dark.svg"
import styles from "./Header.module.scss"
import config from "~/config"

const defaultFn = () => {}

function Header({
    showSearchPreview = false,
    handleShowSearchPreview = defaultFn,
    searchValue = "",
    isSearching = false,
    renderSearchResult = () => null,
    onSearchChange = defaultFn,
    onClearSearch = defaultFn,
    onClickSearchAll = defaultFn,
    onClickUpload = defaultFn,
    onClickLogin = defaultFn,
    onLogOut = defaultFn,
}) {
    return (
        <header className={styles.wrapper}>
            <Grid type="wide">
                <div className={styles.content}>
                    <Link to={config.routes.home} className={styles.logoBox}>
                        <img
                            className={styles.logoDark}
                            src={logoDark}
                            alt=""
                        />
                        <img
                            className={styles.logoTextDark}
                            src={logoTextDark}
                            alt="Tiktok"
                        />
                    </Link>
                    <Popper
                        placement="bottom"
                        minWidth={360}
                        interactive
                        offset={[0, 8]}
                        onClickOutside={() => {
                            handleShowSearchPreview(false)
                        }}
                        visible={showSearchPreview}
                        render={() => (
                            <SearchPreview
                                searchValue={searchValue}
                                onClickSearchAll={onClickSearchAll}
                                renderSearchResult={renderSearchResult}
                            />
                        )}
                    >
                        <div className={styles.searchBox}>
                            <input
                                value={searchValue}
                                placeholder="Search accounts"
                                onFocus={() => {
                                    searchValue &&
                                        handleShowSearchPreview(true)
                                }}
                                onChange={onSearchChange}
                            />

                            <div
                                onClick={onClearSearch}
                                className={styles.clearBtn}
                            >
                                {isSearching && (
                                    <FontAwesomeIcon
                                        className={styles.spinningIcon}
                                        icon={faCircleNotch}
                                    />
                                )}
                                {!isSearching && !!searchValue ? (
                                    <FontAwesomeIcon
                                        className={styles.clearIcon}
                                        icon={faTimesCircle}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className={styles.searchBtn}>
                                <FontAwesomeIcon
                                    className={styles.searchIcon}
                                    icon={faSearch}
                                />
                            </div>
                        </div>
                    </Popper>

                    <div className={styles.menuRight}>
                        <UserContext.Consumer>
                            {(currentUser) =>
                                currentUser ? (
                                    <>
                                        <Tooltip
                                            content="Upload video"
                                            interactive
                                        >
                                            <Link
                                                to={config.routes.upload}
                                                className={styles.upload}
                                            >
                                                <UploadIcon />
                                            </Link>
                                        </Tooltip>

                                        <Tooltip content="Message" interactive>
                                            <Link
                                                to={config.routes.message}
                                                className={styles.message}
                                            >
                                                <MessageIcon />
                                            </Link>
                                        </Tooltip>

                                        <Popper
                                            placement="bottom"
                                            interactive
                                            offset={[-94, 15]}
                                            minWidth={376}
                                            delay={[0, 400]}
                                            trigger={'click'}
                                            render={() => (
                                                <Notification />
                                            )}
                                        >
                                            <div className={styles.inbox}>
                                                <InboxIcon />
                                            </div>
                                        </Popper>

                                        <Popper
                                            placement="bottom"
                                            interactive
                                            offset={[-70, 15]}
                                            minWidth={223}
                                            delay={[0, 400]}
                                            render={() => (
                                                <UserHeaderPreview
                                                    nickName={currentUser.nickname}
                                                    onLogOut={onLogOut}
                                                />
                                            )}
                                        >
                                            <div className={styles.avatar}>
                                                <img
                                                    src={currentUser.avatar}
                                                    alt=""
                                                />
                                            </div>
                                        </Popper>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            type="normal"
                                            size="s"
                                            underline
                                            onClick={onClickUpload}
                                        >
                                            Upload
                                        </Button>

                                        <Button
                                            type="primary"
                                            size="m"
                                            onClick={onClickLogin}
                                        >
                                            Log in
                                        </Button>
                                        <Popper
                                            placement="bottom"
                                            interactive
                                            offset={[-70, 15]}
                                            minWidth={223}
                                            delay={[0, 400]}
                                            render={() => (
                                                <OptionHeaderPreview />
                                            )}
                                        >
                                            <div className={styles.setting}>
                                                <FontAwesomeIcon
                                                    className={
                                                        styles.settingIcon
                                                    }
                                                    icon={faEllipsisV}
                                                />
                                            </div>
                                        </Popper>
                                    </>
                                )
                            }
                        </UserContext.Consumer>
                    </div>
                </div>
            </Grid>
        </header>
    )
}

export default Header
