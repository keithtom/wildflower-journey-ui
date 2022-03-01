import { default as MaterialBox } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const CustomBox = styled(MaterialBox)(({ theme }) => ({
}));

const Box = ({ children, ...rest }) => {
  return (
    <CustomBox {...rest}>
      {children}
    </CustomBox>
  );
}

export default Box
