import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid';
import CustomersTable from './CustomersTable.jsx';
import CustomerEdit from './CustomerEdit.jsx';
import DeleteCustomerModal from './DeleteCustomerModal.jsx';
import Snackbar from '../Snackbar.jsx';
import { Routes, useParams } from 'react-router-dom';
import getRandomUsers from '../../testing/getRandomUsers.js';

const columns = [
	{ field: 'lp', headerName: 'LP', type: 'number' },
	{ field: 'data', headerName: 'Data' },
	{ field: 'nrUmowy', headerName: 'Nr umowy', width: 120 },
	{ field: 'firma', headerName: 'Firma', width: 350 },
	{ field: 'nip', headerName: 'NIP', width: 120 },
	{ field: 'adres', headerName: 'Adres', width: 300 },
	{ field: 'reprezentant', headerName: 'Reprezentant', width: 170 },
	{ field: 'telefon', headerName: 'Telefon', width: 150 },
	{ field: 'email', headerName: 'E-mail', width: 200 },
	{
		field: 'calkowita',
		headerName: 'Kwota całkowita',
		width: 130,
		type: 'number',
	},
	{ field: 'calkowitaSlownie', headerName: 'Słownie', width: 220 },
	{ field: 'rata1', headerName: 'Rata 1', width: 130, type: 'number' },
	{ field: 'rata1Slownie', headerName: 'Słownie', width: 220 },
	{ field: 'rata2', headerName: 'Rata 2', width: 130, type: 'number' },
	{ field: 'rata2Slownie', headerName: 'Słownie', width: 220 },
];

const rows = getRandomUsers(25);

const defaultSnackbarState = {
	label: '',
	open: false,
	severity: 'success',
};

const Panel = props => {
	const [selectedRow, setSelectedRow] = useState(0);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showRowPanel, setShowRowPanel] = useState(false);
	const [snackbarState, setSnackbarState] = useState(defaultSnackbarState);

	const showSnackbar = (label, severity = snackbarState.severity) => {
		setSnackbarState(snackbarState => ({ ...snackbarState, label, severity, open: true }));
	};

	const hideSnackbar = () => setSnackbarState(defaultSnackbarState);

	const getActionsColumn = useCallback(
		() => ({
			field: 'actions',
			type: 'actions',
			getActions: params => [
				<GridActionsCellItem
					icon={<EditIcon />}
					label='Edytuj'
					onClick={() => {
						setSelectedRow(params.id);
						setShowRowPanel(true);
					}}
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label='Usuń'
					onClick={() => {
						setSelectedRow(params.id);
						setShowDeleteModal(true);
					}}
				/>,
			],
			hideable: false,
		}),
		[]
	);

	return (
		<>
			<Box height='80vh' padding='45px 30px' {...props}>
				{/* Modal */}
				{showDeleteModal && (
					<DeleteCustomerModal
						open={showDeleteModal}
						onCancel={() => setShowDeleteModal(false)}
						onConfirm={() => {
							console.log(`User #${selectedRow} deleted`);
							setShowDeleteModal(false);
							showSnackbar('Klient został usunięty');
						}}
					/>
				)}

				{/* Snackbars */}
				<Snackbar
					open={snackbarState.open}
					label={snackbarState.label}
					onClose={(e, reason) => {
						if (reason === 'clickaway') return;
						hideSnackbar();
					}}
					AlertProps={{ onClose: hideSnackbar }}
				/>

				<Routes></Routes>

				{/* Panel content */}
				{showRowPanel ? (
					<CustomerEdit
						data={rows[0]}
						onSave={customerData => {
							console.log(customerData);
							showSnackbar('Zapisano');
						}}
						onReturn={() => {
							setShowRowPanel(false);
						}}
					/>
				) : (
					<CustomersTable
						columns={[getActionsColumn(), ...columns]}
						rows={rows}
						getRowId={row => row.lp}
					/>
				)}
			</Box>
		</>
	);
};

export default Panel;

// TODO: Formatting values
