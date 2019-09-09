/** @format */

import * as React from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

import useSystemAlert from '../utils/useSystemAlert'
import { DONATIONS_API, unauthedJson } from '../utils/apis'
import Form from './commons/Form'
import FormField from './commons/FormField'

interface IDonationForm extends ReactStripeElements.InjectedStripeProps {}

const DonationForm: React.FC<IDonationForm> = ({ stripe }) => {
    const { pushAlert } = useSystemAlert()

    const amounts = [1, 5, 10, 20, 50]

    const [name, setName] = React.useState('')
    const [amount, setAmount] = React.useState<number>(5)
    const [custom, setCustom] = React.useState(false)

    React.useEffect(() => {
        if (custom) {
            document.getElementById('CustomAmount').focus()
        }
    }, [custom])

    const handleSubmit = async () => {
        let { token } = await stripe.createToken({
            name,
            currency: 'usd',
        })
        if (!token) {
            return pushAlert(
                { content: 'Please double check your card information', type: 'warning' },
                5000,
            )
        }
        try {
            await unauthedJson(DONATIONS_API, 'POST', { tokenid: token.id, amount, name })
            pushAlert({ content: '❤ Thank you so much for your financial support! ❤' }, 20000)
        } catch (err) {
            console.log(err)
            pushAlert(
                {
                    content:
                        'It looks like we are having difficulties receiving donations right now. 😞',
                    type: 'warning',
                },
                5000,
            )
        }
    }

    const handleRadioChange: React.ChangeEventHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.id === 'custom') {
            setCustom(true)
        } else {
            setCustom(false)
            setAmount(parseInt(e.target.id))
        }
    }

    return (
        <Form
            action={handleSubmit}
            submitText="Donate!"
            className="col-lg-6 col-md-8 mx-auto mt-5 border rounded-lg shadow"
        >
            <FormField name="Name" state={[name, setName]} />
            <div className="form-group m-3">
                <label htmlFor="CardInfo"> Card Info </label>
                <CardElement id="CardInfo" className="p-2 border rounded form-control" />
            </div>
            <div className="btn-group btn-group-toggle m-3" data-toggle="buttons">
                {amounts.map((amt) => (
                    <label
                        className={'btn btn-primary' + (!custom && amount === amt ? ' active' : '')}
                        key={amt}
                    >
                        <input
                            type="radio"
                            name="amount"
                            id={amt.toString()}
                            checked={!custom && amount === amt}
                            onChange={handleRadioChange}
                        />{' '}
                        ${amt}
                    </label>
                ))}
                <label className={'btn btn-primary' + (custom ? ' active' : '')}>
                    <input
                        type="radio"
                        name="amount"
                        id="custom"
                        checked={custom}
                        onChange={handleRadioChange}
                    />{' '}
                    Custom
                </label>
            </div>
            {custom && (
                <FormField
                    name="Custom Amount"
                    state={['$' + amount, (x) => setAmount(parseInt(x.slice(1)))]}
                    transform={(s) => '$' + (parseInt(s.replace('$', '')) || 0)}
                />
            )}
        </Form>
    )
}

export default injectStripe(DonationForm)
