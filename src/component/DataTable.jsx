import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv';
import SearchBar from './SearchBar';

const DataTable = ({ rows, columns, searchValue, onSearchChange, onConsult }) => {
  // Prepare data for CSV export
  const headers = columns.map((col) => ({ label: col.headerName, key: col.field }));
  const csvData = rows.map((row) => {
    const newRow = {};
    headers.forEach((header) => {
      newRow[header.key] = row[header.key];
    });
    return newRow;
  });

  return (
    <div style={{ height: 500, width: '90%', margin: '0 auto' }}>
      {/* Search Bar */}
      <SearchBar value={searchValue} onChange={onSearchChange} align="center" />

      {/* CSV Export Button */}
      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <CSVLink data={csvData} headers={headers} filename="data-export.csv" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Export CSV
          </Button>
        </CSVLink>
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onConsult(params.id)}
              >
                Consult
              </Button>
            ),
          },
        ]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
