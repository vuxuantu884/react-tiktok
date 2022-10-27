import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Toast.scss'


function Toast({
    message='',
    children= null,
    ...props
}) {
    const notify = () => toast(message)
    return (
        <>
            <div onClick={notify}>{children}</div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                {...props}
            />
        </>
    )
}

export default Toast
