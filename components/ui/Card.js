import { PinDropSharp } from '@mui/icons-material';
import { default as MaterialCard } from '@mui/material/Card';
import { default as MaterialCardContent} from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const CustomCard = styled(MaterialCard)(({ theme }) => ({
}));
const CustomCardContent = styled(MaterialCardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  '&:last-child': {
    paddingBottom: theme.spacing(4)
  }
}));

const Card = ({ children, ...rest }) => {
  return (
    <CustomCard {...rest}>
      <CustomCardContent>
        {children}
      </CustomCardContent>
    </CustomCard>
  );
}

export default Card
