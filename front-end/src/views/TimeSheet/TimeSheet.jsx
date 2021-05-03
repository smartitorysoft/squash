import { useDispatch, useSelector } from 'react-redux';
import { getOpenings, getRules } from 'store/openings/actions';
import { Box, Button } from '@material-ui/core';
import { useEffect } from 'react';
import * as moment from 'moment';
import DefaultOpenings from './components/DefaultOpenings/DefaultOpenings';
import RulesTable from './components/RulesTable/RulesTable';

const TimeSheet = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOpenings(moment(new Date()).format('YYYY-MM-DD')));
		dispatch(getRules());
	}, []);

	const openings = useSelector((state) => state.openings.openings);
	const rules = useSelector((state) => state.openings.rules);

	// console.log('opening', rules);

	return (
		<Box>
			<DefaultOpenings openingsList={openings} />
			<RulesTable rules={rules} />
			<Button
				color='primary'
				size='large'
				variant='contained'

			>
				Új szabály

			</Button>
		</Box>
	);
};

export default TimeSheet;
