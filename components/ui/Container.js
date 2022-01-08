import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid ${props => props.highlight ? 'none'
    : props.bgUrl ? 'none'
      : props.theme.color.neutral.medium
  };
  border-radius: ${props => props.small ? props.theme.util.radiusMedium
    : props.theme.util.radiusLarge
  }px;
  background: ${props => props.highlight ? props.theme.color.primary.yellow.lightened
    : props.bgUrl ? `url(${props.bgUrl})`
      : props.theme.color.neutral.white
  };
  background-size: ${props => props.bgUrl ? 'cover' : null};
  background-position: ${props => props.bgUrl ? 'center' : null};
  padding: ${props => props.small ? props.theme.util.buffer*4
    : props.theme.util.buffer*8
  }px;
  padding-top: ${props => props.display && props.theme.util.buffer*48}px;
`;

const Container = ({
  children,
  ...rest
}) => {
  return (
    <StyledContainer
      {...rest}
    >
      {children}
    </StyledContainer>
  )
}

export default Container
