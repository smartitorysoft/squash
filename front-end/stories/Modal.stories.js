import { Card } from '@material-ui/core'
import React from 'react'

import {ReserveModal} from '../src/components/ReserveModal/ReserveModal'

export default {
    title: 'Example/ReserveModal',
    component: ReserveModal,
    argTypes:{ 
        backgroundColor: { control: 'color' },
    },
  };
  
  const Template = (args) => <ReserveModal {...args} />;

  export const Opened = Template.bind({});
  Opened.args = {
      open: true,
      onClose: () => alert('close')
    
  };
