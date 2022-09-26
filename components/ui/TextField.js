import FormControl from "@mui/material/FormControl";
import { styled, css } from "@mui/material/styles";
import { Stack, Input, Typography } from "./index";

export default function TextField({
  charCount,
  charLimit,
  placeholder,
  label,
  endAdornment,
  inputRef,
  ...props
}) {
  return (
    <Stack spacing={1}>
      <FormControl variant="standard">
        <Stack spacing={2}>
          <Typography variant="bodyRegular">{label}</Typography>
          <Input
            multiline
            inputRef={inputRef}
            placeholder={placeholder}
            endAdornment={endAdornment}
            {...props}
          />
          {(charCount || charLimit) && (
            <Typography variant="bodySmall" lightened>
              {charCount} / {charLimit}
            </Typography>
          )}
        </Stack>
      </FormControl>
    </Stack>
  );
}
