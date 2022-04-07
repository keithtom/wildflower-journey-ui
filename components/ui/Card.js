import { PinDropSharp } from '@mui/icons-material';
import { default as MaterialCard } from '@mui/material/Card';
import { default as MaterialCardContent} from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const CustomCard = styled(MaterialCard)(({ variant, theme }) => ({
  backgroundColor: variant === "warning" ? theme.palette.secondary.light : "white",
  border: variant === "warning" ? `${theme.util.borderWidth} solid ${theme.palette.secondary.light}` : `${theme.util.borderWidth} solid ${theme.palette.border.main}`
}));
const CustomCardContent = styled(MaterialCardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  '&:last-child': {
    paddingBottom: theme.spacing(4)
  }
}));

const Card = ({ variant, children, ...rest }) => {
  return (
    <CustomCard {...rest} variant={variant}>
      <CustomCardContent>
        {children}
      </CustomCardContent>
    </CustomCard>
  );
}

export default Card
