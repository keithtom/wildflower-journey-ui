import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid ${props => props.highlight ? 'none'
    : props.bgImage ? 'none'
      : props.theme.color.neutral.medium
  };
  border-radius: ${props => props.small ? props.theme.util.radiusMedium
    : props.theme.util.radiusLarge
  }px;
  background: ${props => props.highlight ? props.theme.color.primary.yellow.lightened
    : props.theme.color.neutral.white
  };
  ${props => props.bgImage &&`
    background:linear-gradient(0deg, rgba(0,0,0, 0.48), rgba(0,0,0, 0.16)), url('${props.bgImage}');
    background-size: cover;
    background-position: center;
  `}
  padding: ${props => props.small ? props.theme.util.buffer*4
    : props.theme.util.buffer*8
  }px;
  padding-top: ${props => props.display && props.theme.util.buffer*48}px;
  transition: ${({ theme }) => theme.util.transition};
  &:hover {
    cursor: ${(props) => props.link ? 'pointer' : 'auto'};
    background: ${(props) => (props.link && props.bgImage) ? 'auto'
      : props.link && props.theme.color.neutral.light
    };
    transition: ${({ theme }) => theme.util.transition};
  }
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
