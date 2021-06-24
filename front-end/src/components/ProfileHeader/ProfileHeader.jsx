import {
	AppBar,
	Tabs,
	Tab,
	ThemeProvider,
	createMuiTheme,
} from '@material-ui/core';
import React from 'react';

import TabPanel from '../TabPanel/TabPanel';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00C853',
			contrastText: '#fff',
		},
	},
});

export const ProfileHeader = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<ThemeProvider theme={theme}>
				<AppBar position="static">
					<Tabs
						variant="fullWidth"
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
						color="primary"
					>
						<Tab label="Foglalásaim" />
						<Tab label="Tranzakciók" />
					</Tabs>
				</AppBar>
			</ThemeProvider>
			<TabPanel value={value} index={0}>
				Foglalásaim
			</TabPanel>
			<TabPanel value={value} index={1}>
				Tranzakciók
			</TabPanel>
		</div>
	);
};

export default ProfileHeader;
