import React from 'react';
import { Container, Grid } from '../components/ui'

export default {
  title: 'UI/Container',
  component: Container,
  parameters: {
    // layout: 'fullscreen'
  }
};

const Template = (args) => <Container {...args}>I'm a container!</Container>

const ContainerInContext = (args) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Container {...args}>Container 1</Container>
      </Grid>
      <Grid item xs={4}>
        <Container {...args}>Container 2</Container>
      </Grid>
      <Grid item xs={4}>
        <Container {...args}>Container 3</Container>
      </Grid>
    </Grid>
  )
}

export const Demo = ContainerInContext.bind({});
Demo.args = {
  small: false,
  yellow: false,
  paddingTopLarge: false
}

export const Default = Template.bind({});
Default.args = {
  small: false,
  yellow: false,
  paddingTopLarge: false
}

export const Small = Template.bind({});
Small.args = {
  small: true,
  yellow: false,
  paddingTopLarge: false
}

export const Yellow = Template.bind({});
Yellow.args = {
  small: false,
  yellow: true,
  paddingTopLarge: false
}

export const PaddingTopLarge = Template.bind({});
PaddingTopLarge.args = {
  small: false,
  yellow: false,
  paddingTopLarge: true
}
