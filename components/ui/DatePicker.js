import { DatePicker as MaterialDatePicker } from "@mui/x-date-pickers/DatePicker";
import FormHelperText from "@mui/material/FormHelperText";
import { styled, css } from "@mui/material/styles";
import { TextField, Stack } from "./index";

const CustomDatePicker = styled(MaterialDatePicker)``;

export default function DatePicker({
  id,
  value,
  onChange,
  label,
  helperText,
  error,
  ...props
}) {
  return (
    <Stack>
      <CustomDatePicker
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <TextField
            error={error}
            inputRef={inputRef}
            endAdornment={InputProps?.endAdornment}
            {...inputProps}
          />
        )}
        {...props}
      />

      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Stack>
  );
}
