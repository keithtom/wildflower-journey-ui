import { default as MaterialRadio } from "@mui/material/Radio";
import { styled } from "@mui/material/styles";

const CustomRadio = styled(MaterialRadio)`
  color: ${({ theme }) => theme.color.neutral.main};
`;

const Radio = ({ ...props }) => {
  return <CustomRadio defaultChecked disableRipple {...props} />;
};

export default Radio;
