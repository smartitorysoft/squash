import React from 'react';

const {
	Table,
	TableContainer,
	TableCell,
	TableBody,
	TableHead,
	TableRow,
} = require('@material-ui/core');

const DefaultOpenings = ({ openingsList }) => (
	<TableContainer>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell component="th">Hétfő</TableCell>
					<TableCell component="th">Kedd</TableCell>
					<TableCell component="th">Szerda</TableCell>
					<TableCell component="th">Csütörtök</TableCell>
					<TableCell component="th">Péntek</TableCell>
					<TableCell component="th">Szombat</TableCell>
					<TableCell component="th">Vasárnap</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					{openingsList &&
						openingsList.map((opening, index) => (
							<TableCell key={index}>
								{opening.openingHour} - {opening.closingHour}
							</TableCell>
						))}
				</TableRow>
			</TableBody>
		</Table>
	</TableContainer>
);

export default DefaultOpenings;
