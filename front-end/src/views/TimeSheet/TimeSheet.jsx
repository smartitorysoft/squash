/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import {
	getOpenings,
	getRules,
	deleteRule,
	createRule,
	updateRule,
} from 'store/openings/actions';
import {
	Box,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	TextField,
	IconButton,
	createMuiTheme,
	ThemeProvider,
	makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { Formik, Form, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useRouter } from 'next/router';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import useTranslation from 'next-translate/useTranslation';
import { green } from '@material-ui/core/colors';
import DefaultOpenings from './components/DefaultOpenings/DefaultOpenings';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: '#fff',
		},
		secondary: {
			main: '#07671E',
			contrastText: '#fff',
		},
		error: {
			main: '#FB2222',
			contrastText: '#000',
		},
	},
});

const useStyles = makeStyles((theme) => ({
	buttonBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
}));

const TimeSheet = (props) => {
	const { defaultNamespace } = props;
	const { t } = useTranslation(defaultNamespace);
	const classes = useStyles();

	const [newRule, setNewRule] = useState(false);
	const [saving, setSaving] = useState(false);
	const [name, setName] = useState('');
	const [opening, setOpening] = useState('');
	const [closing, setClosing] = useState('');
	const [date, setDate] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const openings = useSelector((state) => state.openings.openings);
	const rules = useSelector((state) => state.openings.rules);

	const deleteRuleList = [];

	const onSubmit = async (values) => {
		const createList = values.ruleList.filter((rule) => !rule.id);
		await dispatch(createRule(createList));
		await dispatch(deleteRule(deleteRuleList));

		const updateRuleList = [];
		values.ruleList.forEach((rule) => {
			rule.rule &&
				updateRuleList.push({
					id: rule.id,
					rule: rule.rule,
					name: rule.name,
					order: values.ruleList.indexOf(rule),
					openingHour: rule.openingHour,
					closingHour: rule.closingHour,
				});
		});
		await dispatch(updateRule(updateRuleList));
	};

	return (
		<Dashboard>
			<ThemeProvider theme={theme}>
				<Box>
					<DefaultOpenings openingsList={openings} />
					<Formik
						enableReinitialize
						onSubmit={onSubmit}
						initialValues={{
							ruleList: rules ? [...rules] : [],
						}}
					>
						{(formikProps) => {
							const {
								values,
								handleChange,
								handleBlur,
								isSubmitting,
							} = formikProps;
							return (
								<Form>
									<TableContainer>
										<Table>
											<TableHead>
												<TableCell>{t('rule')}</TableCell>
												<TableCell>{t('default')}</TableCell>
												<TableCell>{t('open')}</TableCell>
												<TableCell>{t('close')}</TableCell>
												<TableCell />
												<TableCell />
												<TableCell />
											</TableHead>
											<FieldArray name="ruleList">
												{(props) => {
													const { push, remove, swap, form } = props;
													const { values } = form;
													const { ruleList } = values;
													return (
														<TableBody>
															{ruleList &&
																ruleList.map((rule, index) => (
																	<TableRow key={rule.order}>
																		<TableCell>{rule.name}</TableCell>
																		<TableCell>
																			{rule.isDefault ? t('yes') : t('no')}
																		</TableCell>
																		<TableCell>{rule.openingHour}</TableCell>
																		<TableCell>{rule.closingHour}</TableCell>
																		<TableCell>
																			{!rule.isDefault && (
																				<IconButton
																					onClick={() => {
																						if (rule.id) {
																							deleteRuleList.push({
																								id: rule.id,
																							});
																						}
																						remove(index);
																					}}
																				>
																					<DeleteIcon />
																				</IconButton>
																			)}
																		</TableCell>
																		<TableCell>
																			{!rule.isDefault && (
																				<IconButton
																					onClick={() => {
																						if (index != 2) {
																							swap(index, index - 1);
																						}
																					}}
																				>
																					<KeyboardArrowUpIcon />
																				</IconButton>
																			)}
																		</TableCell>
																		<TableCell>
																			{!rule.isDefault && (
																				<IconButton
																					onClick={() => {
																						if (index != ruleList.length - 1) {
																							swap(index, index + 1);
																						}
																					}}
																				>
																					<KeyboardArrowDownIcon />
																				</IconButton>
																			)}
																		</TableCell>
																	</TableRow>
																))}
															{newRule && (
																<TableRow>
																	<TableCell>
																		<TextField
																			label={t('rule')}
																			onChange={(text) =>
																				setName(text.target.value)
																			}
																		/>
																	</TableCell>
																	<TableCell />
																	<TableCell>
																		<TextField
																			variant="outlined"
																			label={t('open')}
																			onChange={(text) =>
																				setOpening(text.target.value)
																			}
																		/>
																	</TableCell>
																	<TableCell>
																		<TextField
																			variant="outlined"
																			label={t('close')}
																			onChange={(text) =>
																				setClosing(text.target.value)
																			}
																		/>
																	</TableCell>
																	<TableCell>
																		<TextField
																			variant="outlined"
																			label={t('date')}
																			onChange={(text) =>
																				setDate(text.target.value)
																			}
																		/>
																	</TableCell>
																	<TableCell>
																		<IconButton
																			onClick={() => {
																				push({
																					name,
																					openingHour: parseInt(opening),
																					closingHour: parseInt(closing),
																					order:
																						ruleList.length > 0 &&
																						ruleList[ruleList.length - 1].order
																							? ruleList[ruleList.length - 1]
																									.order + 1
																							: 1,
																					rule: date,
																				});
																				setNewRule(false);
																			}}
																		>
																			<CheckIcon color="primary" />
																		</IconButton>
																	</TableCell>
																	<TableCell>
																		<IconButton
																			onClick={() => setNewRule(false)}
																		>
																			<CloseRoundedIcon color="error" />
																		</IconButton>
																	</TableCell>
																</TableRow>
															)}
														</TableBody>
													);
												}}
											</FieldArray>
										</Table>
									</TableContainer>
									<Box className={classes.buttonBox}>
										<Button
											color="primary"
											size="large"
											variant="contained"
											onClick={() => setNewRule(true)}
										>
											{t('newRule')}
										</Button>

										<Button
											color="primary"
											size="large"
											variant="contained"
											type="submit"
										>
											{t('save')}
										</Button>
										<Button
											color="primary"
											size="large"
											variant="contained"
											onClick={() => router.back()}
										>
											{t('back')}
										</Button>
									</Box>
								</Form>
							);
						}}
					</Formik>
				</Box>
			</ThemeProvider>
		</Dashboard>
	);
};

export default TimeSheet;
