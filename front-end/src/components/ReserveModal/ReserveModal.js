
import React, {useState} from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup, Modal} from '@material-ui/core'
import '../../../styles/ReserveModal.module.css'

export const ReserveModal = ({ open, onClose, reserved}) => {
    
    const [checked, setChecked] = useState({
        checkedA : false,
        checkedB : false
    })

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]:event.target.checked})
    }

    return (
        <div>
            <Modal 
                open = {open}
                onClose = {onClose}
            >
               <div className='modal'>
                    <div className='boxes'>
                        <FormGroup row>
                            <FormControlLabel 
                            disabled={ reserved && reserved.includes("1")} 
                            control={<Checkbox checked={checked.checkedA} 
                            onChange={handleChange} name="checkedA" />}
                            label="1-es pálya"
                            />
                            <FormControlLabel 
                            disabled={ reserved && reserved.includes("2")}   
                            control={<Checkbox checked={checked.checkedB} 
                            onChange={handleChange} name="checkedB" />}
                            label="2-es pálya"
                            />
                        </FormGroup>
                    </div>
                    <Button variant="contained" color="primary">Foglalás</Button>
                </div>
            </Modal>
        </div>
    )
}
