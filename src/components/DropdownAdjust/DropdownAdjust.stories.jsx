import React from 'react';
import DropdownAdjust from './DropdownAdjust';

export default {
  title: 'Components/DropdownAdjust',
  component: DropdownAdjust,
};

const Template = (args) => <DropdownAdjust {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttonContent: <button type="button">Adjust</button>,
  onRefreshFolders: () => {},
  switchBackground: () => {},
  onToggleCrt: () => {},
  retroCrtEnabled: true,
};
