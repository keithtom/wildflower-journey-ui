import { default as MaterialFormControl } from '@mui/material/FormControl';
import { default as MaterialMenuItem } from '@mui/material/MenuItem';
import { default as MaterialPopover } from '@mui/material/Popover';
import { default as MaterialSelect } from '@mui/material/Select';
import { default as MaterialInputBase} from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import {
  Text
} from '../ui/index'


const CustomDropdown = styled(MaterialSelect)(({ theme }) => `
    width: '100%';
    &.MuiInputBase-root {
      .MuiOutlinedInput-notchedOutline {
        display: none;
      }
      border-radius: ${theme.util.radius * 2}px;
      border: ${theme.util.borderLight};
      transition: ${theme.util.transition};
      &:hover {
        border: ${theme.util.border};
        transition: ${theme.util.transition}
      }
      .MuiSelect-select {
        padding: ${theme.util.buffer * 4}px;
      }
    };
    .testing {
      margin-top: 20px;
    }
  `
)
const CustomMenu = styled(MaterialPopover)(({ theme }) => `

`)
const CustomMenuItem = styled(MaterialMenuItem)(({ theme }) => `
    padding: ${({ theme }) => theme.util.buffer * 4}px;
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
    <MaterialFormControl fullWidth>
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
        MenuProps={{
          classes: {
            paper: 'testing'
          }
        }}
      >
        {children}
      </CustomDropdown>
    </MaterialFormControl>
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
