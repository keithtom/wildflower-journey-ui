import { default as MaterialGrid } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const CustomGrid = styled(MaterialGrid)(({ theme }) => ({
}));

const Grid = ({ children, ...props }) => {
  return (
    <CustomGrid {...props}>
      {children}
    </CustomGrid>
  );
}

export default Grid
