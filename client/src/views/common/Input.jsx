import React from 'react'

export const Input = ({ value, setValue, placeholder, type }) => {
    return (
        <div className='app-input'>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}
