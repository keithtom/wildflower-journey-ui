import styled from 'styled-components';

const defaultAvatar = '/assets/images/profile-default.png'

const AvatarContainer = styled.div`
  height: ${props => props.small ? 24 : props.large ? 100 : 32}px;
  width: ${props => props.small ? 24 : props.large ? 100 : 32}px;
  border-radius: ${({ theme }) => theme.util.radius}px;
  background: ${props => props.img && `center / cover no-repeat url("${props.img}")`};
  background-color: ${({ theme }) => theme.color.neutral.lightened};
`

const Avatar = ({
  img,
  ...props
}) => {
  return (
    <AvatarContainer img={img ? img : defaultAvatar} {...props} />
  )
}

export default Avatar
