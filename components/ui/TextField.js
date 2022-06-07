import { default as MaterialTextField } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@ui'

const CustomTextField = styled(MaterialTextField)(({ theme }) => `
`)

export default function TextField({
  charCount,
  charLimit,
  children,
  placeholder,
  ...rest
}) {
  return (
    <Stack spacing={1}>
      <CustomTextField
        placeholder={placeholder}
        {...rest}
      >{children}</CustomTextField>
      {(charCount || charLimit) &&
        <Typography>{charCount} / {charLimit}</Typography>
      }
    </Stack>
  );
}
