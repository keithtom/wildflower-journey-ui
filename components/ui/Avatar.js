import { default as MaterialAvatar } from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const CustomAvatar = styled(MaterialAvatar)(({ theme }) => ({
}));

const Avatar = ({ sm, md, lg, ...rest }) => {
  let size = sm ? 24 : md ? 40 : lg ? 56 : 40
  return (
    <CustomAvatar {...rest}
      sx={{ width: size, height: size }}
    />
  );
}

export default Avatar