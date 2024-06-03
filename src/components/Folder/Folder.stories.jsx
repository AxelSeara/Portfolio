import React from 'react';
import Folder from './Folder';

export default {
  title: 'Components/Folder',
  component: Folder,
};

const Template = (args) => <Folder {...args} />;

export const Closed = Template.bind({});
Closed.args = {
  initialOpen: false,
};

export const Open = Template.bind({});
Open.args = {
  initialOpen: true,
};
