import { useRouter } from 'next/router'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@mui/material'

const NavLink = ({
  to,
  icon,
  label
}) => {
  const router = useRouter()
  return (
    <Link href={to} color="text.main" underline="none">
      <ListItem button selected={to === router.pathname}>
        {icon && <ListItemIcon>
          {icon}
        </ListItemIcon>}
        <ListItemText primary={label} />
      </ListItem>
    </Link>
  )
}

export default NavLink