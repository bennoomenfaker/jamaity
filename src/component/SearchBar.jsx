import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange, align = 'center' }) => {
  const alignmentStyles = {
    display: 'flex',
    justifyContent: align === 'center' ? 'center' : 'flex-end',
    marginBottom: '10px', // Add some margin for spacing
  };

  return (
    <div style={alignmentStyles}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        style={{ width: '50%' }} // Adjust the width as needed
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;