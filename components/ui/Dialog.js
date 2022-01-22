import styled from 'styled-components';
import Modal from 'styled-react-modal'
import Icon from './Icon'
import Text from './Text'
import Grid from './Grid'

export const DialogBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.util.zIndexTop};
`
const Content = styled.div`
  background-color: ${({ theme }) => theme.color.neutral.white};
  border-radius: ${({ theme }) => theme.util.radius}px;
  box-shadow: ${({ theme }) => theme.util.shadow};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${({ theme }) => theme.util.maxFormWidth}px;
  max-height: 85vh;
  padding: ${({ theme }) => theme.util.buffer*6}px;
`
const CloseContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.util.buffer*6}px;
  right: ${({ theme }) => theme.util.buffer*4}px;
  height: 30px;
  width: 30px;
  svg {
      color: ${({ theme }) => theme.color.text.lightened};
    }
  &:hover {
    cursor: pointer;
    svg {
      color: ${({ theme }) => theme.color.text.dark};
    }
  }
`

const Dialog = ({
  open,
  toggleDialog,
  title,
  children
}) => {
  return (
    <Modal
      isOpen={open}
      onBackgroundClick={toggleDialog}
      onEscapeKeydown={toggleDialog}>
      <Content>
        {title && <Grid mb={4}><Text body large bold>{title}</Text></Grid>}
        {children}
        <CloseContainer onClick={toggleDialog}>
          <Icon type="close" />
        </CloseContainer>
      </Content>
    </Modal>
  )
}

export default Dialog
