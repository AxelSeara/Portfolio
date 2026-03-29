import React from 'react';
import MainLayout from './MainLayout';
import Navbar from '../Navbar/Navbar';

export default {
  title: 'Components/MainLayout',
  component: MainLayout,
};

const Template = (args) => (
  <>
    <MainLayout {...args}>
      <Navbar name="Axel S" links={['About', 'CV']} />
    </MainLayout>
  </>
);

export const Default = Template.bind({});
Default.args = {};
