import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

function Button({
    to = "",
    href = "",
    size = "",
    type = "primary",
    textColor = "normalText",
    borderColor = "none",
    children = null,
    openNewTab = false,
    underline = false,
    disabled = false,
    onClick = () => {},
    className = "",
}) {
    const classNames = [
        
        styles.wrapper,
        styles[type],
        styles[size],
        styles[textColor],
        styles[borderColor],
        underline ? styles.underline : "",
        disabled ? styles.disabled : "",
        className,
    ];

    const props = {};
    let Component = "button";
    if (href) {
        Component = "a";
        props.href = href;
        if (openNewTab) {
            props.target = "_blank";
        }
    }
    if (to) {
        Component = Link;
        props.to = to;
    }

    return (
        <Component
            {...props}
            className={classNames.join(" ")}
            onClick={onClick}
        >
            <span>{children}</span>
        </Component>
    );
}

export default Button;
