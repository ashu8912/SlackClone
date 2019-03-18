import React, { Component } from 'react'
import {Menu, Icon, Modal, Form, Input, Button} from "semantic-ui-react";
import {connect} from "react-redux";
import firebase from "../../firebase";
import { setCurrentChannel } from '../../actions';

const mapDispatchToProps=(dispatch)=>{
return {
   changeChannel:(channel)=>dispatch(setCurrentChannel(channel)) 
}
}
export default connect(null,mapDispatchToProps)(class Channels extends Component {
    state={
        channels:[],
        modal:false,
        user:this.props.currentUser,
        channelName:"",
        channelDetails:"",
        firstLoaded:true,
        activeChannel:"",
        channelsRef:firebase.database().ref("channels")
    }
    componentDidMount()
    {
        this.addListeners();
    }
    addListeners=()=>{
        var loadedChannels=[];
        this.state.channelsRef.on("child_added",snap=>{
           loadedChannels.push(snap.val());
           this.setState({channels:loadedChannels},()=>this.setFirstChannel());

        })
    }
    setFirstChannel=()=>{
        if(this.state.channels.length>0 && this.state.firstLoaded)
        {
            let firstChannel=this.state.channels[0];
            this.setActiveChannel(firstChannel);
            this.props.changeChannel(firstChannel);
        }
    }
    setActiveChannel=(channel)=>{
       this.setState({activeChannel:channel});
    }
    openModal=()=>{
        this.setState({modal:true});
    }
    closeModal=()=>{
        this.setState({modal:false});
    }
    handleChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.isFormValid(this.state))
        {
          const key=this.state.channelsRef.push().key;
          this.state.channelsRef.child(key).update({
              id:key,
              name:this.state.channelName,
              details:this.state.channelDetails,
              createdBy:{
                  name:this.state.user.displayName,
                  avatar:this.state.user.photoURL
              }
          }).then(()=>{
              this.setState({channelName:"",channelDetails:""});
              this.closeModal();
              console.log("channel added");
              
          }).catch((err)=>{
              console.log(err);
          })
        }
    }
    isFormValid=({channelName,channelDetails})=>{
     return channelDetails && channelName
    }
    displayChannels=(channels)=>{
        return channels.length>0 && channels.map((channel)=>(
        <Menu.Item key={channel.id} name={channel.name}
        onClick={()=>this.changeChannel(channel)}
        style={{opacity:0.7}}
        active={this.state.activeChannel.id===channel.id}>
            # {channel.name}
        </Menu.Item>))
    }
    changeChannel=(channel)=>{
       this.setActiveChannel(channel); 
       this.props.changeChannel(channel);
    }
    componentWillUnmount(){
        this.state.channelsRef.off();
    }
  render() {
      const {channels,modal}=this.state;
    return (
       <React.Fragment> 
      <Menu.Menu style={{paddingBottom: "2em",}}>
      <Menu.Item>
      <span>
      <Icon name="exchange"/>CHANNELS
      </span>
      ({channels.length}) <Icon name="add" onClick={this.openModal} style={{cursor:"pointer"}}/>
      </Menu.Item>
      {this.displayChannels(channels)}
      </Menu.Menu>
      <Modal open={modal} onClose={this.closeModal}>
      <Modal.Header>
      Add a Channel
      </Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field>
      <Input fluid label="Name Of Channel" name="channelName"
      onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
      <Input fluid label="About The Channel" name="channelDetails"
      onChange={this.handleChange}/>
      </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button color="green" inverted onClick={this.handleSubmit}>
      <Icon name="checkmark"/> Add
      </Button>
      <Button color="red" inverted onClick={this.closeModal}> 
      <Icon name="remove"/> Cancel
      </Button>
      </Modal.Actions>
      </Modal>
      </React.Fragment>
    )
  }
})
