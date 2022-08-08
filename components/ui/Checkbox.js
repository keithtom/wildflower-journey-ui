import { default as MaterialCheckbox } from "@mui/material/Checkbox";
import { styled, css } from "@mui/material/styles";

const CustomCheckbox = styled(MaterialCheckbox)`
  color: ${({ theme }) => theme.color.neutral.main};
`;

const Checkbox = ({ ...props }) => {
  return <CustomCheckbox defaultChecked disableRipple {...props} />;
};

export default Checkbox;
