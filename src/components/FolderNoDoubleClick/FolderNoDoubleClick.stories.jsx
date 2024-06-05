import React from 'react';
import FolderNoDoubleClick from './FolderNoDoubleClick';
import CVContent from '../../content/CVContent';
import DailyBloomContent from '../../content/DailyBloomContent';
import WeatherContent from '../../content/WeatherContent';

export default {
  title: 'Components/FolderNoDoubleClick',
  component: FolderNoDoubleClick,
};

const Template = (args) => <FolderNoDoubleClick {...args} />;

export const CV = Template.bind({});
CV.args = {
  initialOpen: false,
  name: 'CV',
  content: <CVContent />,
  style: { top: '80px', left: '80px' },
};

export const DailyBloom = Template.bind({});
DailyBloom.args = {
  initialOpen: false,
  name: 'DailyBloom',
  content: <DailyBloomContent />,
  style: { top: '160px', left: '200px' },
};

export const Weather = Template.bind({});
Weather.args = {
  initialOpen: false,
  name: 'Weather',
  content: <WeatherContent />,
  style: { top: '240px', left: '320px' },
};
