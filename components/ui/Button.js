import styled from 'styled-components'

const StyledButton = styled.button`
  border: none;
  font-size: ${({ theme }) => theme.text.body.large.size}px;
  line-height: ${({ theme }) => theme.text.body.large.lineHeight}px;
  min-width: ${({ theme }) => theme.util.buffer*48}px;
  border-radius: ${({ theme }) => theme.util.buffer*2}px;
  padding: ${({ theme }) => theme.util.buffer*4}px ${({ theme }) => theme.util.buffer*8}px;
  transition: ${({ theme }) => theme.util.transition};

  width: ${props => props.full && '100%'};

  background-color: ${props => props.lightened ? props.theme.color.primary.purple.lightened
    : props.disabled ? props.theme.color.neutral.light
      : props.theme.color.primary.purple.main
  };
  color: ${props => props.lightened ? props.theme.color.primary.purple.main
    : props.disabled ? props.theme.color.text.lightened
      : props.theme.color.text.light
  };

  &:hover {
    cursor: ${props => props.disabled ? 'auto' : 'pointer'};

    background-color: ${props => props.lightened ? props.theme.color.primary.purple.main
      : props.disabled ? props.theme.color.neutral.light
        : props.theme.color.primary.purple.main
    };
    color: ${props => props.lightened ? props.theme.color.text.light
      : props.disabled ? props.theme.color.text.lightened
        : props.theme.color.text.light
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
