import { default as MaterialDivider } from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const CustomDivider = styled(MaterialDivider)(({ theme }) => ({
}));

const Divider = ({ children, ...props }) => {
  return (
    <CustomDivider {...props}>
      {children}
    </CustomDivider>
  );
}

export default Divider
