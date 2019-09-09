/** @format */

import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import useLogin from '../utils/useLogin'
import useSystemAlert from '../utils/useSystemAlert'
import Form from '../components/commons/Form'
import FormField from '../components/commons/FormField'

interface ILoginPage extends RouteComponentProps {
    registering?: boolean
}

const LoginPage: React.FC<ILoginPage> = ({ history, registering }) => {
    const { loginLocal, register } = useLogin()
    const { pushAlert } = useSystemAlert()

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleLogin = () => {
        if (!registering) {
            loginLocal(email, password).then((success) => {
                if (success) {
                    history.push('/')
                } else {
                    pushAlert({
                        content: "Our jabberwocky didn't like your credentials. Please try again.",
                        type: 'warning',
                    })
                }
            })
        } else {
            if (password !== confirmPassword) {
                pushAlert({
                    content: "We can't read your mind. Doublecheck your passwords are the same.",
                    type: 'warning',
                })
            }
            register(firstName + ' ' + lastName, email, password).then((success) => {
                if (success) {
                    history.push('/writeblog')
                } else {
                    pushAlert({
                        content: "Our jabberwocky didn't like your credentials. Please try again.",
                        type: 'warning',
                    })
                }
            })
        }
    }

    React.useEffect(() => {
        try {
            document.getElementById('FirstName').focus()
        } catch (err) {
            document.getElementById('Email').focus()
        }
    }, [])

    return (
        <section className="row d-flex">
            <Form
                submitText={registering ? 'Register' : 'Login'}
                action={handleLogin}
                className="col-6 border rounded shadow-lg mt-5 mx-auto"
            >
                {registering && (
                    <>
                        <FormField state={[firstName, setFirstName]} name="First Name" />
                        <FormField state={[lastName, setLastName]} name="Last Name" />
                        <hr />
                    </>
                )}
                <FormField state={[email, setEmail]} name="Email" />
                <FormField state={[password, setPassword]} name="Password" type="password" />
                {registering && (
                    <FormField
                        state={[confirmPassword, setConfirmPassword]}
                        name="Confirm Password"
                        type="password"
                    />
                )}
            </Form>
        </section>
    )
}

export default withRouter(LoginPage)
