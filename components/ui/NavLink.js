import { useRouter } from 'next/router'
import {
  ListItem,
  ListItemText,
} from '@mui/material'
import { Link, Grid } from '@ui'

const NavLink = ({
  to,
  icon,
  adornment,
  active,
  secondary,
  label
}) => {
  const router = useRouter()
  return (
    <Link href={to} color="text.main" underline="none">
      <ListItem button selected={to === router.pathname} sx={(active && secondary) ? {bgcolor: "neutral.main"} : active && {bgcolor: "primary.main", color: "text.light"}}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              {icon && <Grid item xs="auto">
                {icon}
              </Grid>}
              <Grid item><ListItemText primary={label} /></Grid>
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
