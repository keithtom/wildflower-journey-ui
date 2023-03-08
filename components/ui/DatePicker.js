import { DatePicker as MaterialDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled, css } from "@mui/material/styles";
import { TextField } from "./index";

const CustomDatePicker = styled(MaterialDatePicker)``;

export default function DatePicker({ id, value, onChange, label, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomDatePicker
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <TextField
            inputRef={inputRef}
            {...inputProps}
            endAdornment={InputProps?.endAdornment}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
}
