import { default as MaterialTypography } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CustomTypography = styled(MaterialTypography)(({ theme }) => ({
}));

const Typography = ({ ...rest }) => {
  return (
    <CustomTypography {...rest} />
  );
}

export default Typography