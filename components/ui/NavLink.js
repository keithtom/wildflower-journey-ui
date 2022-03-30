import { useRouter } from 'next/router'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link, Grid } from '@ui'

const NavLink = ({
  to,
  icon,
  adornment,
  label
}) => {
  const router = useRouter()
  return (
    <Link href={to} color="text.main" underline="none">
      <ListItem button selected={to === router.pathname}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row">
              {icon && <ListItemIcon>
                {icon}
              </ListItemIcon>}
              <ListItemText primary={label} />
            </Grid>
          </Grid>
          {adornment && <Grid item>
            {adornment}
          </Grid>}
        </Grid>
      </ListItem>
    </Link>
  )
}

export default NavLink