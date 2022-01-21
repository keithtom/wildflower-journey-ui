import styled from 'styled-components'

import {
  Grid,
  Text,
} from '../ui'
import Icon from './Icon'

const HiddenInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
  position: absolute;
`;
const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
`;
const StyledInput = styled.div`
  width: ${({ theme }) => theme.util.buffer * 5}px;
  height: ${({ theme }) => theme.util.buffer * 5}px;
  border: 1px solid ${({ theme }) => theme.color.neutral.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.disabled ? props.theme.color.neutral.light
    : 'transparent'
  };
  &:hover {
    cursor: ${(props) => props.disabled ? 'auto' : 'pointer'};
  };
  &:after {
    content: "";
    display: block;
    width: ${({ theme }) => theme.util.buffer * 4}px;
    height: ${({ theme }) => theme.util.buffer * 4}px;
    background: ${(props) => props.checked ? props.theme.color.primary.purple.main
      : 'transparent'
    };
  }
`;
const StyledCheckbox = styled(StyledInput)`
  border-radius: ${({ theme }) => theme.util.buffer}px;
  &:after {
    border-radius: ${({ theme }) => theme.util.buffer / 2}px;
  }
`
const StyledRadio = styled(StyledInput)`
  border-radius: ${({ theme }) => theme.util.buffer * 4}px;
  &:after {
    border-radius: ${({ theme }) => theme.util.buffer * 4}px;
  }
`
const StyledIcon = styled(Icon)`
  position: absolute;
  color: ${(props) => props.checked ? props.theme.color.neutral.white
    : 'transparent'
  };
`;

const Select = ({
  label,
  checkbox,
  radio,
  checked,
  disabled,
  onClick
}) => {
  return (
    <StyledLabel>
    {checkbox ?
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <HiddenInput type="checkbox" checked={checked} />
          <StyledCheckbox
            type="checkbox"
            checked={checked}
            onClick={onClick}
            disabled={disabled}
          >
            <StyledIcon type="check" checked={checked}/>
          </StyledCheckbox>
        </Grid>
        <Grid item>
          <Text body regular lightened={disabled}>{label}</Text>
        </Grid>
      </Grid>
    : radio ?
      <Grid container spacing={2}>
        <Grid item>
          <HiddenInput type="radio" checked={checked} />
          <StyledRadio
            type="radio"
            checked={checked}
            onClick={onClick}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Text body regular lightened={disabled}>{label}</Text>
        </Grid>
      </Grid>
    : null}
    </StyledLabel>
  )
}

export default Select
