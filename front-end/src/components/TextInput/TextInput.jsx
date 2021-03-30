import React from 'react'
import TextField from '@material-ui/core/TextField'

export const TextInput = ({label, type}) => {
    return (
        <div>
            <TextField label={label} type={type} style={{width:300}} />
        </div>
    )
}

export default TextInput