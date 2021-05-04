import { useDispatch, useSelector } from 'react-redux';
import {
	getOpenings, getRules, deleteRule, createRule,
} from 'store/openings/actions';
import {
	Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, TextField, IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import * as moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import DefaultOpenings from './components/DefaultOpenings/DefaultOpenings';
import RulesTable from './components/RulesTable/RulesTable';

const TimeSheet = () => {
	const [newRule, setNewRule] = useState(false);
	const [saving, setSaving] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOpenings(moment(new Date()).format('YYYY-MM-DD')));
		dispatch(getRules());
	}, []);

	const [name, setName] = useState('');
	const [opening, setOpening] = useState('');
	const [closing, setClosing] = useState('');

	const openings = useSelector((state) => state.openings.openings);
	const rules = useSelector((state) => state.openings.rules);

	const newRulesList = [];

	const addNewRule = () => {
		if (opening > -1 && opening < 25 && closing > -1 && closing < 25 && parseInt(opening, 10) < parseInt(closing, 10)) {
			newRulesList.push({
				name,
				openingHour: opening,
				closingHour: closing,
				order: 4,
				rule: new Date(),
			});
		}
		setNewRule(false);
	};

	const removeRule = (id) => {
		const del = [];
		del.push({ id });
		dispatch(deleteRule(del));
	};

	const saveRules = () => {
		dispatch(createRule(newRulesList));
	};

	return (
		<Box>
			<DefaultOpenings openingsList={openings} />
			{/* <RulesTable rules={rules} newRule={newRule} saving={saving} /> */}

			<TableContainer>
				<Table>
					<TableHead>
						<TableCell>Szabály</TableCell>
						<TableCell>Default</TableCell>
						<TableCell>Nyitás</TableCell>
						<TableCell>Zárás</TableCell>
						<TableCell />
					</TableHead>
					<TableBody>
						{
							rules && rules.map((rule) => (
								<TableRow key={rule.isDefault}>
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
									<TableCell>
										{rule.isDefault
									&& (
										<IconButton onClick={() => removeRule(rule.id)}>
											<DeleteIcon />
										</IconButton>
									)}
									</TableCell>
								</TableRow>
							))
						}
						{
							newRule && (
								<TableRow>
									<TableCell>
										<TextField label='Szabály' onChange={(text) => setName(text.target.value)} />
									</TableCell>
									<TableCell />
									<TableCell>
										<TextField label='Nyitás' onChange={(text) => setOpening(text.target.value)} />
									</TableCell>
									<TableCell>
										<TextField label='Zárás' onChange={(text) => setClosing(text.target.value)} />
									</TableCell>
									<TableCell>
										<IconButton onClick={addNewRule}>
											<CheckIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				color='primary'
				size='large'
				variant='contained'
				onClick={() => setNewRule(true)}
			>
				Új szabály

			</Button>
			<Button
				color='primary'
				size='large'
				variant='contained'
				onClick={saveRules}
			>
				Mentés
			</Button>
		</Box>
	);
};

export default TimeSheet;
