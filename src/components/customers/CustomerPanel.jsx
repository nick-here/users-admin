import React, { useState } from 'react';
import { Button, Tab, Typography, Box, Paper, TextField, InputAdornment } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDebug } from '../../hooks.js';
import Horizontal from '../utility/Horizontal';

const Form = () => {
	return (
		<form>
			<TabPanel value='1'>
				{/* Ogólne */}
				<TextField label='LP' disabled />
				<TextField label='Data' />
				<TextField label='Adres strony' />
			</TabPanel>
			<TabPanel value='2'>
				{/* Dane kontaktowe */}
				<Horizontal width={450}>
					<div>
						<TextField label='Nazwa firmy' />
						<TextField label='Adres firmy' />
						<TextField label='NIP' type='number' />
					</div>
					<div>
						<TextField label='Reprezentant' />
						<TextField label='E-mail' type='email' />
						<TextField label='Telefon' type='phone' />
					</div>
				</Horizontal>
			</TabPanel>
			<TabPanel value='3'>
				<TextField
					label='Kwota całkowita'
					type='number'
					InputProps={{
						endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
					}}
					sx={{ display: 'block' }}
				/>

				<Horizontal width={450}>
					<TextField
						label='Rata 1'
						type='number'
						InputProps={{
							endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
						}}
					/>
					<TextField
						label='Rata 2'
						type='number'
						InputProps={{
							endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
						}}
					/>
				</Horizontal>
			</TabPanel>
		</form>
	);
};

const CustomerPanel = ({ data, onSave }) => {
	const [tabIndex, setTabIndex] = useState('1');
	const [editMode, setEditMode] = useState(false);

	useDebug([data]);

	return (
		<Box>
			<Typography variant='h4' component='h1'>
				Panel klienta
			</Typography>

			<Paper
				sx={{ padding: 3, mt: 2, minHeight: 400, display: 'flex', flexDirection: 'column' }}
			>
				<TabContext value={tabIndex}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={(e, value) => setTabIndex(value)}>
							<Tab label='Ogólne' value='1' />
							<Tab label='Dane kontaktowe' value='2' />
							<Tab label='Płatności' value='3' />
						</TabList>
					</Box>

					{editMode ? <Form /> : <div>info</div>}
				</TabContext>

				<Box display='flex' justifyContent='flex-end' mt='auto'>
					{editMode ? (
						<Button
							size='large'
							variant='contained'
							onClick={() => {
								onSave(0);
								setEditMode(false);
							}}
						>
							Zapisz
						</Button>
					) : (
						<Button size='large' variant='outlined' onClick={() => setEditMode(true)}>
							Edytuj
						</Button>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default CustomerPanel;
