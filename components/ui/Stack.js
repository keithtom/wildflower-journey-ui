import { default as MaterialStack } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const CustomStack = styled(MaterialStack)(({ theme }) => ({
}));

const Stack = ({ children, ...rest }) => {
  return (
    <CustomStack {...rest}>
      {children}
    </CustomStack>
  );
}

export default Stack
