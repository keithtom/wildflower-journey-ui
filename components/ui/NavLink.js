import { styled, css } from "@mui/material/styles";
import { ListItem } from "@mui/material";

import { Typography, Grid, Link, Icon } from "./index";

const NavLink = ({ to, icon, active, secondary, tertiary, label }) => {
  const CustomListItem = styled(ListItem)`
    padding: ${({ theme }) => theme.util.buffer * 4}px;
    &:hover {
      background: ${({ theme }) => theme.color.neutral.lightened};
    }

    //Active
    ${(props) =>
      props.active &&
      css`
        background: ${props.theme.color.neutral.lightened};
      `}

    //Secondary
    ${(props) =>
      props.secondary &&
      css`
        padding: ${props.theme.util.buffer * 3}px 0;
        border-top: 1px solid ${props.theme.color.neutral.lightened};
      `}
    //Tertiary
    ${(props) =>
      props.tertiary &&
      css`
        padding: ${props.theme.util.buffer * 2}px 0;
      `}
  `;

  return (
    <Link href={to}>
      <CustomListItem
        button
        active={active}
        secondary={secondary}
        tertiary={tertiary}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          ml={secondary ? 10 : tertiary && 10}
        >
          {icon && (
            <Grid item>
              <Icon
                type={icon}
                variant={active ? "primary" : tertiary && "transparent"}
              />
            </Grid>
          )}
          <Grid item>
            <Typography
              highlight={active}
              bold={!tertiary}
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
