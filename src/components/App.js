import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import {connect} from "react-redux";
import ColorPanel from "./ColorPanel/colorPanel";
import Messages from "./Messages/Messages";
import SidePanel from "./SidePanel/sidePanel";
import MetaPanel from "./MetaPanel/MetaPanel";

const mapStateToProps=(state)=>({
  "currentUser":state.user.currentUser,
  "currentChannel":state.channel.currentChannel
})
export default connect(mapStateToProps)(({currentUser,currentChannel})=>{
return (
  <Grid columns="equal" style={{background:"#eee"}}>
  <ColorPanel/>
  <SidePanel currentUser={currentUser} key={currentChannel && currentChannel.id}/>
  <Grid.Column style={{marginLeft:320}}>
  <Messages currentChannel={currentChannel} key={currentChannel && currentChannel.id} currentUser={currentUser}/>
  </Grid.Column>
  <Grid.Column width={4}>
  <MetaPanel/>
  </Grid.Column>
  </Grid>
)
})
