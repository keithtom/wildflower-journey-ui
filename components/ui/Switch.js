import { default as MaterialSwitch } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { FormControlLabel } from "@mui/material";

const CustomSwitch = styled(MaterialSwitch)`
  width: ${({ theme }) => theme.util.buffer * 9}px;
  height: ${({ theme }) => theme.util.buffer * 4}px;
  padding: 0;
  border-radius: ${({ theme }) => theme.radius.full}px;
  margin-right: ${({ theme }) => theme.util.buffer * 2}px;
  background: ${({ theme }) => theme.color.neutral.lightened};
  .MuiSwitch-thumb {
    box-sizine: "border-box";
    width: ${({ theme }) => theme.util.buffer * 3}px;
    height: ${({ theme }) => theme.util.buffer * 3}px;
    box-shadow: none;
  }
  .MuiSwitch-switchBase {
    padding: 0px;
    margin: 2px;
  }
  .MuiSwitch-track {
    background: ${({ theme }) => theme.color.neutral.darkened};
  }
`;

const Switch = ({ label, ...props }) => {
  return (
    <FormControlLabel
      control={<CustomSwitch disableRipple={true} {...props} />}
      label={label}
    />
  );
};

export default Switch;
