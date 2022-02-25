import { default as MaterialChip } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const CustomChip = styled(MaterialChip)(({ theme }) => ({
}));

const Chip = ({ ...props }) => {
  return (
    <CustomChip {...props} />
  );
}

export default Chip