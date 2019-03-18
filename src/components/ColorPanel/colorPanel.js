import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button} from 'semantic-ui-react';

export default class ColorPanel extends Component {
  render() {
    return (
      <Sidebar as={Menu}
      visible
      width="very thin"
      vertical
      inverted
      icon="labeled"
      >
      <Divider/>
      <Button icon="add" size="small" color="blue"></Button>
      </Sidebar>
    )
  }
}
