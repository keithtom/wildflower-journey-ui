import { default as FormControl } from '@mui/material/FormControl';
import { default as MaterialMenuItem } from '@mui/material/MenuItem';
import { default as MaterialSelect } from '@mui/material/Select';
import { default as MaterialInputBase} from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import {
  Text
} from '../index'
import { Paper } from '@mui/material';

const CustomDropdown = styled(MaterialSelect)(({ theme }) => `
  width: '100%';
  &.MuiInputBase-root {
    border: ${({ theme })  => theme.util.borderLight};
    border-radius: ${theme.util.radius * 2}px;
    &:hover {
      border: ${({ theme }) => theme.util.border};
    }
    &.Mui-focused {
      border: none;
    }
  };
`
)
const CustomMenuItem = styled(MaterialMenuItem)(({ theme }) => `
    padding: ${({ theme }) => theme.util.buffer * 3}px;
    &:last-child {
      border-bottom: 0;
    }
  `
)

export const Dropdown = ({
  children,
  id,
  onChange,
  value,
  defaultValue,
  error,
  placeholder,
  ...props
}) => {

  return (
    <FormControl fullWidth>
      <CustomDropdown
        id={id}
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <div>{placeholder}</div>;
          }
          return selected.join(', ');
        }}
        {...props}
      >
        {children}
      </CustomDropdown>
    </FormControl>
  )
}

export const DropdownItem = ({
  children,
  value,
  disabled,
  ...props
}) => {
  return (
    <CustomMenuItem
      value={value}
      divider
      disabled={disabled}
    >
      {children}
    </CustomMenuItem>
  )
}
