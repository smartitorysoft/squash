import React from 'react'
import  '../../../styles/Card.module.css'
import  AddIcon  from '@material-ui/icons/Add';

export const Card = ({reserved}) => {

    if ( reserved && reserved.length > 0) {
        if (reserved.length === 2) {
            return (
            <div className='full'></div>
            )
        } else {
        return (
            <div className={ 'container'}>
                <div className={reserved[0] === '2' ? 'segment' : 'half'}>
                    {reserved[0] === '2' && <AddIcon/>}
                </div>
                <div className={'verticalLine'} />
                <div className={reserved[0] === '1' ? 'segment' : 'half'}>
                {reserved[0] === '1' && <AddIcon/>}
                </div>
            </div>
        )}
    } else {
        return (
            <div className={'container'} >
       
                    <AddIcon/>  
              
              
            </div>
        )
    }
    
}
