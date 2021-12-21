import styled from 'styled-components'

import {
  Grid,
  Text
} from '../ui'

const StyledSelect = styled.input`

`;

const Select = ({
  label,
  checkbox,
  radio
}) => {
  return (
    <>
    {checkbox ?
      <Grid container spacing={2}>
        <Grid item>
          <StyledSelect type="checkbox" />
        </Grid>
        <Grid item flex={1}>
          <Text body regular>{label}</Text>
        </Grid>
      </Grid>
    : radio ?
      <Grid container spacing={2}>
        <Grid item>
          <StyledSelect type="radio" />
        </Grid>
        <Grid item flex={1}>
          <Text body regular>{label}</Text>
        </Grid>
      </Grid>
    : null}
    </>
  )
}

export default Select
