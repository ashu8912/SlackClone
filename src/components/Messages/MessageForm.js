import React, { Component } from 'react'
import {Segment,Button,Input} from "semantic-ui-react";
import firebase from "../../firebase";
export default class MessageForm extends Component {
    state={
        message:"",
        channel:this.props.channel,
        user:this.props.currentUser,
        loading:false,
        errors:[]
    }
    handleChange=(event)=>{
       this.setState({[event.target.name]:event.target.value})
    }
    createMessage=()=>{
        return {
            content:this.state.message,
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            user:{
                id:this.state.user.uid,
                name:this.state.user.displayName,
                avatar:this.state.user.photoURL
            }
        }
    }
    sendMessage=()=>{
        const {messagesRef}=this.props;
        const {message,channel}=this.state;
        if(message && channel)
        {
        messagesRef.child(channel.id).push().set(this.createMessage()).then(()=>{
            this.setState({loading:false,message:'',errors:[]})
        }).catch((err)=>{
            this.setState({errors:this.state.errors.concat(err)})
        })
        }else{
            this.setState({errors:this.state.errors.concat({message:"Add a Message"})})
        }
    }
  render() {
      const {errors,message,loading}=this.state;
    return (
      <Segment className="message__form">
      <Input
      fluid={true}
      name="message"
      style={{marginBottom: "0.7em",}}
      value={message}
      label={<Button icon="add"></Button>}
      labelPosition="left"
      placeholder="Write your message"
      onChange={this.handleChange}
      className={errors.some((err)=>err.message.toLowerCase().includes("message"))?"error":""}/>
      <Button.Group icon widths="2">
      <Button color="orange" content="Add Reply" disabled={loading} labelPosition="left"
      icon="edit" onClick={this.sendMessage}/>
      <Button color="teal" icon="cloud upload" labelPosition="right"
      content="Upload Media"/>
      </Button.Group>
      </Segment>
    )
  }
}
