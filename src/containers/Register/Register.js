import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

import {
    Wrapper,
    MethodItem,
    Footer
} from '~/components/Auth'
import Button from '~/packages/ducdm-button'
import TextInput from '~/packages/ducdm-textinput'

const FORM_EMAIL_PASSWORD = 'FORM_EMAIL_PASSWORD'

const defaultFn = () => { }

function Register({
    onRegisterSuccess = defaultFn,
    onSwitchLogin = defaultFn,
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
                return 'Sign Up'

            default:
                return 'Sign Up to TikTok'
        }
    }
    const currentForm = getCurrentForm()

    const handleRegister = () => {
        axios.post('/api/auth/register', { type: 'email', email, password })
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                // onRegisterSuccess()
            })
            .catch(err => {
                switch (err.response.status) {
                    case 422:
                        const resErrors = {}
                        Object.keys(err.response.data.errors).forEach(field => {
                            resErrors[field] = err.response.data.errors[field][0]
                        })
                        setErrors(resErrors)
                        console.log(resErrors)
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
                    text="Already have an account?"
                    actionTitle="Log in"
                    onAction={onSwitchLogin}
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
                        onClick={handleRegister}
                    >
                        Sign up
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

                </>
            )}


        </Wrapper>
    )
}

export default Register
