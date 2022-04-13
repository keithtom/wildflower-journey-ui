import { useState } from 'react'
import { DatePicker as MaterialDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import {
  TextField
} from '@ui'

const CustomDatePicker = styled(MaterialDatePicker)(({ theme }) => `
`)

export default function DatePicker({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  ...rest
}) {

  const [dateValue, setDateValue] = useState(value)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomDatePicker
        label={placeholder}
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        {...rest}
      />
    </LocalizationProvider>
  );
}
