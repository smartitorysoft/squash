import React from 'react';

import { Card } from '../src/components/Card/Card';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Card {...args} />;

export const Free = Template.bind({});
Free.args = {
};

export const Full = Template.bind({});
 Full.args = {
    reserved:['1','2']
 };

 export const FirstReserved = Template.bind({});
 FirstReserved.args = {
   reserved:['1']
 };

 export const SecondReserved = Template.bind({});
 SecondReserved.args = {
   reserved:['2']
 };
