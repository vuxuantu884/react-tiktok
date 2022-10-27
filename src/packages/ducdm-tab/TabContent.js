function Tab({
    isOpen,
    children = null
}) {
    if (!isOpen) {
        return null
    }
    return (
        <>
            {children}
        </>
    )
}

export default Tab