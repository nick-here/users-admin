import { Box, Button, Typography, TextField } from '@mui/material';
import React from 'react';
import Horizontal from '../utility/Horizontal';

const FieldGroup = ({ children, label, ...props }) => {
	return (
		<Box {...props}>
			<Typography variant='subtitle1' component='div' color={'text'}>
				{label}
			</Typography>
			{children}
		</Box>
	);
};

const AddCustomerForm = ({ onSubmit = null }) => {
	return (
		<form>
			<Box display='flex' flexDirection='column'>
				<Typography variant='h4' component='h2' mb={4}>
					Dodaj klienta
				</Typography>

				<TextField label='Data' sx={{ alignSelf: 'flex-start' }} />

				<Horizontal spacing={2} sx={{ mt: 4 }}>
					<FieldGroup label='Dane firmy' mr={4}>
						<TextField label='Firma' />
						<TextField label='Adres' />
						<TextField label='NIP' type='number' />
					</FieldGroup>

					<FieldGroup label='Dane osobowe'>
						<TextField label='Reprezentant' />
						<TextField label='E-mail' type='email' />
						<TextField label='Telefon' type='phone' />
					</FieldGroup>
				</Horizontal>

				<FieldGroup label='Płatności' sx={{ mt: 4 }}>
					<TextField label='Kwota całkowita' type='number' sx={{ display: 'block' }} />

					<Horizontal spacing={4}>
						<TextField label='Rata 1' type='number' />
						<TextField label='Rata 2' type='number' />
					</Horizontal>
				</FieldGroup>

				<Button
					variant='contained'
					sx={{ mt: 4 }}
					onClick={() => {
						onSubmit && onSubmit();
					}}
				>
					Dodaj
				</Button>
			</Box>
		</form>
	);
};

export default AddCustomerForm;

// TODO: Loading visualised
// TODO: Use DatePicker