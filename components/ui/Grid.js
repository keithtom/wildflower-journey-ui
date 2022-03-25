import { default as MaterialGrid } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const CustomGrid = styled(MaterialGrid)(({ theme }) => ({
}));

const Grid = ({ children, container, ...rest }) => {
  return (
    container ?
    <div>
      <CustomGrid container={container} {...rest}>
        {children}
      </CustomGrid>
    </div>
    :
    <CustomGrid container={container} {...rest}>
      {children}
    </CustomGrid>
  );
}

export default Grid
