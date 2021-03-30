import Button from '@material-ui/core/Button'

import React from 'react'

export const BasicButton = ({label, onClick}) => {
    return (
        <div>
            <Button onClick={onClick} variant="contained" color="primary">{label}</Button>
        </div>
    )
}

export default BasicButton;

