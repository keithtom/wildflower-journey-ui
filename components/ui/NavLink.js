import { styled, css } from "@mui/material/styles";
import { ListItem } from "@mui/material";

import { Typography, Grid, Link, Icon } from "./index";

const NavLink = ({ to, icon, active, variant, label }) => {
  const CustomListItem = styled(ListItem)`
    padding-left: ${({ theme }) => theme.util.buffer}px;
    &:hover {
      background: ${({ theme }) => theme.color.neutral.lightened};
    }

    //Primary
    ${(props) =>
      props.variant === "primary" &&
      css`
        padding: ${props.theme.util.buffer * 3}px 0;
        &:hover {
          background: ${props.theme.color.neutral.lightened};
        }
      `}
    //Secondary
    ${(props) =>
      props.variant === "secondary" &&
      css`
        padding: ${props.theme.util.buffer * 3}px 0;
        border-top: 1px solid ${props.theme.color.neutral.lightened};
      `}
      //Tertiary
      ${(props) =>
      props.variant === "tertiary" &&
      css`
        padding: ${props.theme.util.buffer * 2}px 0;
      `}
  `;

  return (
    <Link href={to}>
      <CustomListItem variant={variant}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          ml={variant === "secondary" ? 10 : variant === "tertiary" ? 10 : 0}
        >
          {icon && (
            <Grid item>
              <Icon
                size={variant === "secondary" && "small"}
                type={icon}
                variant={
                  active ? "primary" : variant === "tertiary" && "transparent"
                }
              />
            </Grid>
          )}
          <Grid item>
            <Typography
              highlight={active}
              bold={variant === "primary" || variant === "secondary"}
              variant="bodyRegular"
            >
              {label}
            </Typography>
          </Grid>
        </Grid>
      </CustomListItem>
    </Link>
  );
};

export default NavLink;
