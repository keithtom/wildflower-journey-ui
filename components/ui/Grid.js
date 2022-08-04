import { default as MaterialGrid } from "@mui/material/Grid";
import { styled, css } from "@mui/material/styles";

const CustomGrid = styled(MaterialGrid)``;

const Grid = ({ container, children, ...props }) => {
  return container ? (
    <div>
      <CustomGrid container={container} {...props}>
        {children}
      </CustomGrid>
    </div>
  ) : (
    <CustomGrid {...props}>{children}</CustomGrid>
  );
};

export default Grid;
