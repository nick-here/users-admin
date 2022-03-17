import React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import getRandomUsers from '../testing/getRandomUsers.js';
import { Edit, Delete } from '@mui/icons-material';

// TODO: validation
// TODO: row deletion

const columns = [
	{
		field: 'actions',
		headerName: 'Akcje',
		type: 'actions',
		getActions: () => [
			<GridActionsCellItem icon={<Delete />} label='Usuń' />,
			<GridActionsCellItem icon={<Edit />} label='Edytuj' />,
		],
	},
	{ field: 'lp', headerName: 'LP', width: 100, type: 'number' },
	{ field: 'data', headerName: 'Data', width: 150, editable: true },
	{ field: 'nrUmowy', headerName: 'Numer umowy', width: 150, editable: true },
	{ field: 'firma', headerName: 'Firma', width: 150, editable: true },
	{ field: 'nip', headerName: 'NIP', width: 150, editable: true },
	{ field: 'adres', headerName: 'Adres', width: 150, editable: true },
	{ field: 'reprezentant', headerName: 'Reprezentant', width: 150, editable: true },
	{ field: 'telefon', headerName: 'Telefon', width: 150, editable: true },
	{ field: 'email', headerName: 'E-mail', width: 150, editable: true },
	{
		field: 'calkowita',
		headerName: 'Kwota całkowita',
		width: 150,
		type: 'number',
		editable: true,
	},
	{ field: 'calkowitaSlownie', headerName: 'Słownie', width: 150 },
	{ field: 'rata1', headerName: 'Rata 1', width: 150, type: 'number', editable: true },
	{ field: 'rata1Slownie', headerName: 'Słownie', width: 150 },
	{ field: 'rata2', headerName: 'Rata 2', width: 150, type: 'number', editable: true },
	{ field: 'rata2Slownie', headerName: 'Słownie', width: 150 },
];

const rows = getRandomUsers(25);

const UsersTable = () => {
	const handleRowEditCommit = React.useCallback(async params => {
		console.log('cell saved: ', params);
		// TODO: server communication
	}, []);

	return (
		<DataGrid
			editMode='row'
			onRowEditCommit={handleRowEditCommit}
			rows={rows}
			columns={columns}
			components={{ Toolbar: GridToolbar }}
			getRowId={row => row.lp}
			// rowsPerPageOptions={[5, 15, 50]}
		/>
	);
};

export default UsersTable;
