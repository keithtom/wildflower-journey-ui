import styled from 'styled-components'

const StyledText = styled.span`
  font-size: ${props => (props.body && props.mini) ? props.theme.text.body.mini.size
    : (props.body && props.small) ? props.theme.text.body.small.size
      : (props.body && props.regular) ? props.theme.text.body.regular.size
        : (props.body && props.large) ? props.theme.text.body.large.size
          : (props.title && props.small) ? props.theme.text.title.small.size
            : (props.title && props.regular) ? props.theme.text.title.regular.size
              : (props.title && props.large) ? props.theme.text.title.large.size
                : (props.title && props.headline) ? props.theme.text.title.headline.size
                  : null
  }px;
  line-height: ${props => (props.body && props.mini) ? props.theme.text.body.mini.lineHeight
    : (props.body && props.small) ? props.theme.text.body.small.lineHeight
      : (props.body && props.regular) ? props.theme.text.body.regular.lineHeight
        : (props.body && props.large) ? props.theme.text.body.large.lineHeight
          : (props.title && props.small) ? props.theme.text.title.small.lineHeight
            : (props.title && props.regular) ? props.theme.text.title.regular.lineHeight
              : (props.title && props.large) ? props.theme.text.title.large.lineHeight
                : (props.title && props.headline) ? props.theme.text.title.headline.lineHeight
                  : null
  }px;
  font-weight: ${props => (props.title && props.bold) ? props.theme.text.weight.semibold
    : (props.body && props.bold) ? props.theme.text.weight.medium
      : props.theme.text.weight.regular
  };
  color: ${props => props.lightened ? props.theme.color.text.lightened
    : props.light ? props.theme.color.text.light
      : props.theme.color.text.dark
  };
  opacity: ${props => (props.opacity === 'light') ? props.theme.color.opacity.light
    : (props.opacity === 'medium') ? props.theme.color.opacity.medium
      : (props.opacity === 'dark') ? props.theme.color.opacity.dark
        : '1'
  };
`;

const Text = ({
  children,
  body,
  title,
  ...rest
}) => {
  return (
    <StyledText
      body={body}
      title={title}
      {...rest}
    >
      {children}
    </StyledText>
  )
}

export default Text
