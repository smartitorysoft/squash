import {
	TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
} from '@material-ui/core';

const RulesTable = ({ rules }) =>
	// console.log('rules', rules);
	 (
		<TableContainer>
			<Table>
				<TableHead>
					<TableCell>Szabály</TableCell>
					<TableCell>Default</TableCell>
					<TableCell>Nyitás</TableCell>
					<TableCell>Zárás</TableCell>
				</TableHead>
				<TableBody>
					{
						rules && rules.map((rule) => (
							<TableRow>
								<TableCell>
									{rule.name}
								</TableCell>
								<TableCell>
									{rule.isDefault ? 'Igen' : 'Nem'}
								</TableCell>
								<TableCell>
									{rule.openingHour}
								</TableCell>
								<TableCell>
									{rule.closingHour}
								</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
export default RulesTable;
