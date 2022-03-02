import { default as MaterialPaper } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CustomPaper = styled(MaterialPaper)(({ theme }) => `
`)

export default function Paper({
  children,
  ...rest
}) {
  return (
    <CustomPaper
      {...rest}
    >{children}</CustomPaper>
  );
}
