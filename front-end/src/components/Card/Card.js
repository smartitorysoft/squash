import React, {useState} from 'react'
import  '../../../styles/Card.module.css'
import  AddIcon  from '@material-ui/icons/Add';
import { ReserveModal } from '../ReserveModal/ReserveModal';
import {IconButton} from '@material-ui/core'

export const Card = ({reserved}) => {
    const [open, setOpen] = useState(false)


    const modalBody = (
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
    )


    const [checked, setChecked] = useState({
        checkedA:false,
        checkedB:false,
    })
    
const handleChange = (event) => {
    setChecked({...checked, [event.target.name]:event.target.checked})
}


    if ( reserved && reserved.length > 0) {
        if (reserved.length === 2) {
            return (
            <div className='full'>Reserved</div>
            )
        } else {
        return (
            <div className={ 'container'}>
                <div className={reserved[0] === '2' ? 'segment' : 'half'}>
                    {reserved[0] === '2' ? 
                    <div>
                        <IconButton onClick={() => setOpen(true)}>
                            <AddIcon/> 
                        </IconButton>
                        <ReserveModal body={modalBody} reserved={reserved} open={open} onClose={() => setOpen(false)} /></div>
                    :
                    <p>Reserved</p>}
                </div>
                <div className={'verticalLine'} />
                <div className={reserved[0] === '1' ? 'segment' : 'half'}>
                {reserved[0] === '1' ? 
                <div>
                    <IconButton onClick={() => setOpen(true)}>
                        <AddIcon/> 
                    </IconButton>
                    <ReserveModal body={modalBody} reserved={reserved} open={open} onClose={() => setOpen(false)} /></div> : 
                    <p>Reserved</p>}
                </div>  
                
            </div>
        )}
    } else {
        return (
            <div className={'container'} >  
                <IconButton onClick={() => setOpen(true)}>
                    <AddIcon/> 
                </IconButton>
                <ReserveModal body={modalBody} reserved={reserved} open={open} onClose={() => setOpen(false)} />
            </div>
        )
    }
    
}
