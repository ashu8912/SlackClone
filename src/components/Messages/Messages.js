import React, { Component } from 'react'
import {Comment, Segment} from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import Message from './Message';
export default class Messages extends Component {
    state={
        channel:this.props.currentChannel,
        user:this.props.currentUser,
        messages:[],
        messageLoading:true,
        messagesRef:firebase.database().ref("messages")
    }
    componentDidMount(){
      let {user,channel}=this.state;
      if(user && channel)
      {
        this.addListeners(channel.id)
      }
    }
    addListeners=(channelId)=>{
     let loadedMessages=[];
     this.state.messagesRef.child(channelId).on("child_added",snap=>{
       loadedMessages.push(snap.val());
       this.setState({messages:loadedMessages,messageLoading:false})
     console.log(loadedMessages);
      })
    }
   displayMessages=(messages)=>{
     return messages.map((message)=>{
       return (<Message key={message.timestamp} user={this.state.user} message={message} />)
     })
   }
  render() {
      const {messagesRef,channel,user,messages}=this.state;
    return (
      <React.Fragment>  
      <MessagesHeader/>
      <Segment>
      <Comment.Group className="messages">
      {this.displayMessages(messages)}
      </Comment.Group>
      </Segment>
      <MessageForm channel={channel} messagesRef={messagesRef}
      currentUser={user}/>
      </React.Fragment>
    )
  }
}
