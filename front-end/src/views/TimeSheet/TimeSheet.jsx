import { useDispatch, useSelector } from 'react-redux';
import {
	getOpenings, getRules, deleteRule, createRule, updateRule,
} from 'store/openings/actions';
import {
	Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, TextField, IconButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { Formik, Form, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DefaultOpenings from './components/DefaultOpenings/DefaultOpenings';
import RulesTable from './components/RulesTable/RulesTable';

const TimeSheet = () => {
	const [newRule, setNewRule] = useState(false);
	const [saving, setSaving] = useState(false);
	const [name, setName] = useState('');
	const [opening, setOpening] = useState('');
	const [closing, setClosing] = useState('');
	const [date, setDate] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOpenings(moment(new Date()).format('YYYY-MM-DD')));
		dispatch(getRules());
	}, []);

	const openings = useSelector((state) => state.openings.openings);
	const rules = useSelector((state) => state.openings.rules);

	const rulesList = [...rules];

	// const addNewRule = async () => {
	// 	if (opening > -1 && opening < 25 && closing > -1 && closing < 25 && parseInt(opening, 10) < parseInt(closing, 10)) {
	// 		// console.log(rules[rules.length - 1].order + 1);
	// 		newRulesList.push({
	// 			name,
	// 			openingHour: parseInt(opening),
	// 			closingHour: parseInt(closing),
	// 			order: rules[rules.length - 1].order + 1,
	// 			rule: date,
	// 		});
	// 	}
	// 	await dispatch(createRule(newRulesList));
	// 	dispatch(getRules());
	// 	setNewRule(false);
	// };

	// const removeRule = async (id) => {
	// 	const del = [];
	// 	del.push({ id });
	// 	await dispatch(deleteRule(del));
	// 	dispatch(getRules());
	// };

	// const switchOrder = async (direction, id) => {
	// 	console.log(rules[rules.indexOf(rules.find((rule) => rule.id === id))], rules[rules.indexOf(rules.find((rule) => rule.id === id)) + direction]);
	// 	if (rules.indexOf(rules.find((rule) => rule.id === id)) + 1 < rules.length || rules.indexOf(rules.find((rule) => rule.id === id)) - 1 > 2) {
	// 		const updateList = [];
	// 		updateList.push({
	// 			...rules[rules.indexOf(rules.find((rule) => rule.id === id))],
	// 			order: rules[rules.indexOf(rules.find((rule) => rule.id === id)) + direction].order,
	// 		});
	// 		updateList.push({
	// 			 ...rules[rules.indexOf(rules.find((rule) => rule.id === id)) + direction],
	// 			 order: rules[rules.indexOf(rules.find((rule) => rule.id === id))].order,
	// 		});
	// 		delete updateList[0].isDefault;
	// 		delete updateList[1].isDefault;
	// 		console.log(updateList);
	// 		await dispatch(updateRule(updateList));
	// 		dispatch(getRules());
	// 	}
	// };

	return (
		<Box>
			<DefaultOpenings openingsList={openings} />
			<Formik
				enableReinitialize
				// onSubmit={onSubmit}
			>
				{(formikProps) => {
					const {
						values, handleChange, handleBlur, isSubmitting,
					} = formikProps;
					return (
						<Box>
							<TableContainer>
								<Table>
									<TableHead>
										<TableCell>Szabály</TableCell>
										<TableCell>Default</TableCell>
										<TableCell>Nyitás</TableCell>
										<TableCell>Zárás</TableCell>
										<TableCell />
									</TableHead>
									<FieldArray
										name='rulesList'
										render={({
											remove, push, swap, replace,
										}) => (
											<TableBody>
												{
													rulesList && rulesList.map((rule) => (
														<TableRow key={rule.order}>
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
																{!rule.isDefault && (
																	<IconButton onClick={() => removeRule(rule.id)}>
																		<DeleteIcon />
																	</IconButton>
																)}
															</TableCell>
															<TableCell>
																{!rule.isDefault && (
																	<IconButton onClick={() => switchOrder(-1, rule.id)}>
																		<KeyboardArrowUpIcon />
																	</IconButton>
																)}
															</TableCell>
															<TableCell>
																{!rule.isDefault && (
																	<IconButton onClick={() => switchOrder(+1, rule.id)}>
																		<KeyboardArrowDownIcon />
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
																<TextField label='Dátum' onChange={(text) => setDate(text.target.value)} />
															</TableCell>
															<TableCell>
																<IconButton onClick={() => {
																	console.log(rulesList);
																	push({
																		name,
																		openingHour: parseInt(opening),
																		closingHour: parseInt(closing),
																		order: rulesList[rulesList.length - 1].order + 1,
																		rule: date,
																	});
																	setNewRule(false);
																}}
																>
																	<CheckIcon />
																</IconButton>
															</TableCell>
														</TableRow>
													)
												}
											</TableBody>
										)}
									/>

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
						</Box>
					);
				}}

			</Formik>
		</Box>
	);
};

export default TimeSheet;

{ /* <DefaultOpenings openingsList={openings} />
			{/* <RulesTable rules={rules} newRule={newRule} saving={saving} /> */ }

// <TableContainer>
// 	<Table>
// 		<TableHead>
// 			<TableCell>Szabály</TableCell>
// 			<TableCell>Default</TableCell>
// 			<TableCell>Nyitás</TableCell>
// 			<TableCell>Zárás</TableCell>
// 			<TableCell />
// 		</TableHead>
// 		<TableBody>
// 			{
// 				rules && rules.map((rule) => (
// 					<TableRow key={rule.order}>
// 						<TableCell>
// 							{rule.name}
// 						</TableCell>
// 						<TableCell>
// 							{rule.isDefault ? 'Igen' : 'Nem'}
// 						</TableCell>
// 						<TableCell>
// 							{rule.openingHour}
// 						</TableCell>
// 						<TableCell>
// 							{rule.closingHour}
// 						</TableCell>
// 						<TableCell>
// 							{!rule.isDefault
// 						&& (
// 							<IconButton onClick={() => removeRule(rule.id)}>
// 								<DeleteIcon />
// 							</IconButton>
// 						)}
// 						</TableCell>
// 						<TableCell>
// 							{!rule.isDefault
// 						&& (
// 							<IconButton onClick={() => switchOrder(-1, rule.id)}>
// 								<KeyboardArrowUpIcon />
// 							</IconButton>
// 						)}
// 						</TableCell>
// 						<TableCell>
// 							{!rule.isDefault
// 						&& (
// 							<IconButton onClick={() => switchOrder(+1, rule.id)}>
// 								<KeyboardArrowDownIcon />
// 							</IconButton>
// 						)}
// 						</TableCell>
// 					</TableRow>
// 				))
// 			}
// 			{
// 				newRule && (
// 					<TableRow>
// 						<TableCell>
// 							<TextField label='Szabály' onChange={(text) => setName(text.target.value)} />
// 						</TableCell>
// 						<TableCell />
// 						<TableCell>
// 							<TextField label='Nyitás' onChange={(text) => setOpening(text.target.value)} />
// 						</TableCell>
// 						<TableCell>
// 							<TextField label='Zárás' onChange={(text) => setClosing(text.target.value)} />
// 						</TableCell>
// 						<TableCell>
// 							<TextField label='Dátum' onChange={(text) => setDate(text.target.value)} />
// 						</TableCell>
// 						<TableCell>
// 							<IconButton onClick={addNewRule}>
// 								<CheckIcon />
// 							</IconButton>
// 						</TableCell>
// 					</TableRow>
// 				)
// 			}
// 		</TableBody>
// 	</Table>
// </TableContainer>
// <Button
// 	color='primary'
// 	size='large'
// 	variant='contained'
// 	onClick={() => setNewRule(true)}
// >
// 	Új szabály

// </Button>
{ /* <Button
				color='primary'
				size='large'
				variant='contained'
				onClick={saveRules}
			>
				Mentés
			</Button> */ }
