import React, { Component } from 'react'
import {Segment,Button,Input} from "semantic-ui-react";
import uuidv4 from "uuid/v4";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import ProgressBar from './ProgressBar';
export default class MessageForm extends Component {
    state={
        message:"",
        channel:this.props.channel,
        user:this.props.currentUser,
        loading:false,
        errors:[],
        modal:false,
        uploadTask:null,
        uploadState:"",
        storageRef:firebase.storage().ref(),
        percentUploaded:0
    }
    handleChange=(event)=>{
       this.setState({[event.target.name]:event.target.value});
    }
    closeModal=()=>{
        this.setState({modal:false})
    }
    openModal=()=>{
        this.setState({modal:true});
    }
    sendFileMessage=(fileURL,ref,pathToUpload)=>{
    ref.child(pathToUpload).push().set(this.createMessage(fileURL))
    .then(()=>{
        this.setState({uploadState:"done"})
    }).catch((err)=>{
        this.setState({errors:this.state.errors.concat(err)});
    })
    }
    uploadFile=(file,metaData)=>{
    const pathToUpload=this.state.channel.id;
    const ref=this.props.messagesRef;
    const filePath=`chat/public/${uuidv4()}`;
    this.setState({
        uploadState:"uploading",
        uploadTask:this.state.storageRef.child(filePath).put(file,metaData)
    },()=>{
        this.state.uploadTask.on("state_changed",snap=>{
           const percentUploaded=Math.round(snap.bytesTransferred/snap.totalBytes)*100;
           this.setState({percentUploaded}); 
        },(err)=>{
            this.setState({errors:this.state.errors.concat(err),uploadState:"error",
        uploadTask:null})
        },()=>{
            this.state.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                this.sendFileMessage(downloadURL,ref,pathToUpload)
            }).catch((err)=>{
                this.setState({errors:this.state.errors.concat(err)})
            })
        })
    })
 
    }
    createMessage=(fileURL=null)=>{
        const message={
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            user:{
                id:this.state.user.uid,
                name:this.state.user.displayName,
                avatar:this.state.user.photoURL
            }
        }
        console.log(fileURL)
        if(fileURL)
        {
         message["image"]=fileURL;  
        }else{
            message["content"]=this.state.message;
        }
        return message;
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
      const {errors,message,loading,modal,uploadState,percentUploaded}=this.state;
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
      <Button color="teal" icon="cloud upload" disabled={uploadState==="uploading"} onClick={this.openModal} labelPosition="right"
      content="Upload Media"/>
      </Button.Group>
      <FileModal modal={modal} uploadFile={this.uploadFile} closeModal={this.closeModal}/>
      <ProgressBar uploadState={uploadState} percentUploaded={percentUploaded}/>
      </Segment>
    )
  }
}
