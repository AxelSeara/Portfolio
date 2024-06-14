// src/stories/ThreeJSComponent.stories.js

import React from 'react';
import ThreeJSComponent from '../components/ThreeJSComponent';

export default {
  title: 'Components/ThreeJSComponent',
  component: ThreeJSComponent,
};

const Template = (args) => <ThreeJSComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};

// Si deseas usar el componente como fondo en una historia
export const Background = (args) => (
  <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <ThreeJSComponent {...args} />
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      zIndex: 1,
    }}>
      <h1>This is a foreground content</h1>
    </div>
  </div>
);