import { default as MaterialAvatar } from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const CustomAvatar = styled(MaterialAvatar)(({ theme }) => ({
}));

const Avatar = ({ ...rest }) => {
  return (
    <CustomAvatar {...rest} />
  );
}

export default Avatar