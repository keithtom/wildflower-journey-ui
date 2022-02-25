import { default as MaterialChip } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const CustomChip = styled(MaterialChip)(({ theme }) => ({
}));

const Chip = ({ ...rest }) => {
  return (
    <CustomChip {...rest} />
  );
}

export default Chip