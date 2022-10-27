import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import {
    Wrapper,
    MethodItem,
    Footer
} from '~/components/Auth'
import Button from '~/packages/ducdm-button'
import TextInput from '~/packages/ducdm-textinput'

const FORM_EMAIL_PASSWORD = 'FORM_EMAIL_PASSWORD'

const defaultFn = () => { }

function Login({
    onSuccess = defaultFn,
    onSwitchRegister = defaultFn,

}) {
    const [forms, setForms] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const getCurrentForm = () => {
        return forms
    }

    const getFormTitle = () => {
        const currentForm = getCurrentForm()
        switch (currentForm) {
            case FORM_EMAIL_PASSWORD:
                return 'Log in'

            default:
                return 'Log in to TikTok'
        }
    }

    const currentForm = getCurrentForm()

    const handleLogin = () => {
        axios.post('/api/auth/login', { email, password })
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                // alert('login ok')
                onSuccess()
                window.location.reload()

            })

            .catch(err => {
                switch (err.response.status) {
                    case 422:
                        const resErrors = {}
                        Object.keys(err.response.data.errors).forEach(field => {
                            resErrors[field] = err.response.data.errors[field][0]
                        })
                        setErrors(resErrors)
                        break;
                    case 401:
                        setErrors({
                            ...errors,
                            password: 'Email or password is incorrect'
                        })

                        break;
                    default:
                        setErrors({
                            ...errors,
                            password: 'An error has occurred, please contact admin@gmail.com'
                        })
                }
            })
    }

    return (
        <Wrapper
            heading={getFormTitle()}
            showBackBtn={!!currentForm}
            onBack={() => { setForms('') }}
            renderFooter={() =>
                <Footer
                    text="Don't have an account?"
                    actionTitle="Sign Up"
                    onAction={onSwitchRegister}
                />
            }
        >
            {currentForm === 'FORM_EMAIL_PASSWORD' ? (
                <>
                    <TextInput
                        label="Email"
                        placeholder="Email"
                        value={email}
                        message={errors.email}
                        autoFocus
                        onChange={e => {
                            setEmail(e.target.value)
                            setErrors({
                                ...errors,
                                email: null
                            })
                        }}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Password"
                        value={password}
                        message={errors.password}
                        autoFocus
                        type="password"
                        onChange={e => {
                            setPassword(e.target.value)
                            setErrors({
                                ...errors,
                                password: null
                            })
                        }}

                    />
                    <Button
                        size="l"
                        style={{ width: '100%' }}
                        disabled={!email || !password}
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                </>

            ) : (
                <>
                    <MethodItem
                        icon={<FontAwesomeIcon icon={faUser} />}
                        title="Use phone / email / username"
                        onClick={() => setForms(FORM_EMAIL_PASSWORD)}
                    />
                    <MethodItem
                        icon={<FontAwesomeIcon icon={faFacebook} />}
                        title="Log in with Facebook"
                        onClick={() => { }}
                    />
                    <MethodItem
                        icon={<FontAwesomeIcon icon={faGoogle} />}
                        title="Log in with Google"
                        onClick={() => { }}
                    />
                </>
            )}


        </Wrapper>
    )
}

export default Login
