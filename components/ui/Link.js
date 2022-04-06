import NextLink from 'next/link'
// import { Link as MUILink } from '@mui/material'

const Link = ({ children, ...rest }) => {
  return (
  <NextLink {...rest}>
    {children}
  </NextLink>
)}

export default Link