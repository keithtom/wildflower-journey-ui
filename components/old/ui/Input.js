import styled from 'styled-components'

import {
  Container,
  Grid,
  Icon
} from '../ui'

const StyledInputWrapper = styled(Container)`
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${({ theme }) => theme.text.body.regular.size}px;
  font-family: ${({ theme }) => theme.text.family};
  &::placeholder {
    color: ${({ theme }) => theme.color.text.lightened};
  }
`;

const Input = ({
  icon,
  placeholder
}) => {
  return (
    <StyledInputWrapper small>
      <Grid container alignItems="center" spacing={2}>

        {icon ?
          <Grid item>
            <Icon type={icon} />
          </Grid>
        : null}

        <Grid item flex={1}>
          <StyledInput
            placeholder={placeholder}
          />
        </Grid>

      </Grid>
    </StyledInputWrapper>
  )
}

export default Input
