import React,{useState} from 'react'
import {Table, TableCell, TableContainer, 
    TableHead, TableRow, TableBody, 
    Paper} from '@material-ui/core'
import TextInput from '../src/components/TextInput';
import styles from '../styles/Table.module.css'
import Row from '../src/components/Row/Row'

export default function credit() {

    const [value, setValue] = useState('')
    const [open, setOpen] = React.useState(false);

    function createData(name, email, credit) {
        return { name, email, credit };
      }

      const rows = [
        createData('Ungnád', 'csillagharcos@example.com', 2005159),
        createData('Tas', 'itTas@example.com', 237),
        createData('Lorem Ipsum','loremipsum@example.com', 262)
      ];

      const filterRows = (row) => {
          if (row.name.includes(value) || row.email.includes(value)) {
              return true
          }
            return false
          
      }

      

    return (
        <div>
            <TextInput  label='Keresés' onChange={(text) => {
                setValue(text.target.value);
            }}/>
            <TableContainer classes={styles.table} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align='left' >Név</TableCell>
                            <TableCell align='right'>Email</TableCell>
                            <TableCell align='right'>Kredit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter((row) =>filterRows(row)).map(filteredRow => ( 
                            <Row row = {filteredRow}/>
                        ))}
                    </TableBody>
                    
                </Table>
            </TableContainer>
            
        </div>
    )
}

