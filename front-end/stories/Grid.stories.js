import React from 'react';

import {GridComponent } from '../src/components/Grid/GridComponent';

export default {
  title: 'Example/GridComponent',
  component: GridComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <GridComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};