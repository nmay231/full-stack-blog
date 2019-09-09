/** @format */

import * as React from 'react'

interface IFormFieldProps extends React.Props<{}> {
    state: [string | number, (newValue: string) => void]
    name: string
    type?: 'text' | 'password' | 'textarea'
    transform?: (value: string) => string
}

const FormField: React.FC<IFormFieldProps> = ({ state, name, type = 'text', transform }) => {
    const [value, setValue] = state

    const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = transform ? transform(e.target.value) : e.target.value
        setValue(newValue)
    }

    const fieldId = name.split(' ').join('')

    return (
        <div className="form-group">
            <div className="form-group m-3">
                <label htmlFor={fieldId}> {name} </label>
                {type === 'textarea' ? (
                    <textarea
                        rows={15}
                        id={fieldId}
                        className="form-control"
                        value={value}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type={type}
                        id={fieldId}
                        className="form-control"
                        value={value}
                        onChange={handleChange}
                    />
                )}
            </div>
        </div>
    )
}

export default FormField
