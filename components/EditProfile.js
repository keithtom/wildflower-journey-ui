import {
  TextField
} from '@ui'

const EditProfile = ({ user }) => {
  return (
    <TextField 
      fullWidth
      placeholder="First Name"
      value={user.firstName}
    />
  )
}

export default EditProfile