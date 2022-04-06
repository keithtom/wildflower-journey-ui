import { default as MaterialAvatarGroup } from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';

const CustomAvatarGroup = styled(MaterialAvatarGroup)(({ theme }) => ({
}));

const AvatarGroup = ({ sm, md, lg, ...rest }) => {
  let size = sm ? 24 : md ? 40 : lg ? 56 : 40
  return (
    <CustomAvatarGroup {...rest}
      sx={{
        '& .MuiAvatar-root': { height: size, width: size, fontSize: size/2 }
      }}
    />
  );
}

export default AvatarGroup