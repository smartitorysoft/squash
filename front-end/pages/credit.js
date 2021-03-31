import React,{useState} from 'react'
import {Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@material-ui/core'
import TextInput from '../src/components/TextInput';

export default function credit() {

    const [value, setValue] = useState('')

    function createData(name, credit) {
        return { name, credit };
      }

      const rows = [
        createData('Ungnád', 159),
        createData('Tas', 237),
        createData('Lorem Ipsum', 262)
      ];

    
    return (
        <div>
            <TextInput  onChange={(text) => {
                setValue(text);
                console.log('value', value);
            }}/>
            <TableContainer  component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Név</TableCell>
                            <TableCell align='right'>Kredit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter((row) => row.name.includes(value)).map(filteredRow => ( 
                            <TableRow key={filteredRow.name}>
                                <TableCell component="th" scope="row">
                                    {filteredRow.name}
                                </TableCell>
                                <TableCell align="right">{filteredRow.credit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

