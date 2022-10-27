import styles from './TextInput.module.scss'

const defaultFn = () => { }

function TextInput({
    label = '',
    value = '',
    message = '',
    onChange = defaultFn,
    ...inputProps
}) {
    return (
        <div className={styles.wrapper}>
            {!!label && (
                <p className={styles.label}>{label}</p>
            )}
            <div className={styles.inputBlock}>
                <input
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                    {...inputProps}
                />
            </div>
            {!!message && (
                <p className={styles.message}>{message}</p>
            )}
        </div>

    )
}

export default TextInput
