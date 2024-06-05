import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Click Me',
};

export const CustomText = Template.bind({});
CustomText.args = {
  text: 'Custom Text',
};