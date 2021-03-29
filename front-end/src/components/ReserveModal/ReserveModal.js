
import React from 'react'
import {Modal} from '@material-ui/core'
import styles from '../../../styles/ReserveModal.module.css'

export const ReserveModal = ({open, onClose}) => {
    return (
        <div>
            <Modal 
                open = {open}
                onClose = {onClose}
            >
                <div className='modal'>
                    <p>Modal</p>
                    <p>Style</p>
                </div>
            </Modal>
        </div>
    )
}
