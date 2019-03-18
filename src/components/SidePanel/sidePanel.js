import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import UserPanel from './userPanel';
import Channels from './Channels';

export default class SidePanel extends Component {
  render() {
    return (
     <Menu
     size="large"
     style={{background:"#4c3c4c",fontSize:"1.2rem"}}
     fixed="left"
     inverted
     vertical
     >
     <UserPanel currentUser={this.props.currentUser}/>
     <Channels currentUser={this.props.currentUser}/>
    </Menu>)
  }
}
