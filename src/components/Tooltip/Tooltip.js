import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

function Tooltip({
    children = null,
    ...props
}) {
    return (
        <Tippy {...props}>
            {children}
        </Tippy>

    )
}

export default Tooltip