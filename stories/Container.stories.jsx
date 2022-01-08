import React from 'react';
import { Container, Grid } from '../components/ui'

export default {
  title: 'UI/Container',
  component: Container,
  parameters: {
    // layout: 'fullscreen'
  },
  argTypes: {
    bgUrl: {
      options: ['', 'https://images.unsplash.com/photo-1542042238232-3a0b14425b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'],
      control: {type: 'select'}
    },
  },
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
  highlight: false
}

export const Default = Template.bind({});
Default.args = {
  small: false,
  highlight: false,
  bgUrl: ''
}

export const Display = Template.bind({});
Display.args = {
  highlight: false,
  display: true,
  small: false,
  bgUrl: ''
}

export const Highlight = Template.bind({});
Highlight.args = {
  highlight: true,
  display: false,
  small: false,
  bgUrl: ''
}

