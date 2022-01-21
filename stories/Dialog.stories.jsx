import { Dialog } from '../components/ui';

export default {
  title: 'UI/Dialog',
  component: Dialog,
};

const Template = ({...args}) => (
  <>
    <Dialog
      {...args}
      toggleDialog={args.open}
    >
      Hey! I'm a dialog!
    </Dialog>
  </>
)

export const Default = Template.bind({});
Default.args = {
  open: true
}
