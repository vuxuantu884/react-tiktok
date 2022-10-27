import { NavLink } from "react-router-dom";

import UserContext from "~/contexts/UserContext";
import { HomeIcon , PeopleIcon } from '~/packages/ducdm-icon'
import Button from "~/packages/ducdm-button";
import config from "~/config";
import styles from "./TopSidebar.module.scss";

function TopSidebar() {
    return (
        <div className={styles.topSidebar}>
            <div className={styles.navList}>
                <NavLink
                    exact
                    to={config.routes.home}
                    className={styles.navItem}
                    activeClassName={styles.active}
                >
                    <HomeIcon className={styles.navIcon} />
                    <span>For You</span>
                </NavLink>
                <NavLink
                    to={config.routes.following}
                    className={styles.navItem}
                    activeClassName={styles.active}
                >
                    <PeopleIcon className={styles.navIcon} />
                    <span>Following</span>
                </NavLink>
            </div>
            <UserContext.Consumer>
                {(currentUser) =>
                    !currentUser && (
                        <div className={styles.loginWrapper}>
                            <p className={styles.helpText}>
                                Log in to follow creators, like videos, and view
                                comments.
                            </p>
                            <Button type="normal" textColor="primaryText" borderColor="primaryBorder" size="l">
                                Log in
                            </Button>
                        </div>
                    )
                }
            </UserContext.Consumer>
        </div>
    );
}

export default TopSidebar;
