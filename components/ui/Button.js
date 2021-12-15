import styled from 'styled-components'

const StyledButton = styled.button`

  border: none;
  font-size: ${({ theme }) => theme.text.body.large.size}px;
  line-height: ${({ theme }) => theme.text.body.large.lineHeight}px;
  min-width: ${({ theme }) => theme.util.buffer*48}px;
  border-radius: ${({ theme }) => theme.util.buffer*2}px;
  padding: ${({ theme }) => theme.util.buffer*4}px ${({ theme }) => theme.util.buffer*8}px;
  background-color: ${props => (props.primary && props.lightened) ? props.theme.color.primary.purple.lightened
    : props.primary ? props.theme.color.primary.purple.main
      : props.disabled ? props.theme.color.neutral.light
        : null
  };
  color: ${props => (props.primary && props.lightened) ? props.theme.color.primary.purple.main
    : props.primary ? props.theme.color.primary.purple.lightened
      : props.disabled ? props.theme.color.text.lightened
        : null
  };
  width: ${props => props.full && '100%'};

  &:hover {
    cursor: ${props => props.disabled ? 'auto' : 'pointer'};
    background-color: ${props => (props.primary && props.lightened) ? props.theme.color.primary.purple.main
      : props.primary ? props.theme.color.primary.purple.lightened
        : props.disabled ? props.theme.color.neutral.light
          : null
    };
    color: ${props => (props.primary && props.lightened) ? props.theme.color.text.light
      : props.primary ? props.theme.color.primary.purple.main
        : props.disabled ? props.theme.color.text.lightened
          : null
    };
  }

`;

const Button = ({
  children,
  full,
  ...rest
}) => {
  return (
    <StyledButton
      full={full}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

export default Button
