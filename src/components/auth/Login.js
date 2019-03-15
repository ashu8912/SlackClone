import React from 'react';
import {Link} from "react-router-dom";
import {Grid,Form,Button, Header,Icon, Segment,Message} from "semantic-ui-react";
import firebase from "../../firebase";

class Login extends React.Component{
    state={
     email:"",
     password:"",
     errors:[],
     loading:false,
     userRef:firebase.database().ref("users")
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.isFormValid(this.state))
        {
            this.setState({errors:[],loading:true});
            firebase.auth().signInWithEmailAndPassword(this.state.email,
                this.state.password).then((signedInUser)=>{
                 console.log(signedInUser);
                }).catch((error)=>{
                 this.setState({errors:this.state.errors.concat(error),loading:false});
                })
          
        }
    }
    isFormValid=({email,password})=>email && password;
    displayErrors=(errors)=>{
    return errors.map((error,i)=><p key={i}>{error.message}</p>)
  } 
  handleInputErrors=(errors,inputName)=>{
  return errors.some((error)=>error.message.toLowerCase().includes(inputName))?"error":"";
  } 
   render()
    {
    const {password,email,errors,loading}=this.state;    
   return (
    <Grid textAlign="center" verticalAlign="middle" className="App">
    <Grid.Column style={{maxWidth:450}}>
    <Header as="h1" icon color="violet" >
    <Icon name="code branch" color="violet"></Icon>
     Login To DevChat
    </Header>
    <Form onSubmit={this.handleSubmit} size="large">
    <Segment stacked>
    <Form.Input fluid name="email" icon="mail"  iconPosition="left" placeholder="Email Address"
    type="email" className={this.handleInputErrors(errors,"email")} onChange={this.handleChange} value={email}/>
    <Form.Input fluid name="password" icon="lock"  iconPosition="left" placeholder="Password"
    type="password" className={this.handleInputErrors(errors,"password")} onChange={this.handleChange} value={password}/>
    <Button disabled={loading} className={loading?"loading":""} color="violet" fluid size="large">Submit</Button>
    </Segment>
    </Form>
    {errors.length>0 && <Message error>
        <h2>
        Error
        </h2>
        {this.displayErrors(errors)}
        </Message>
    }
    
    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
    </Grid.Column>
    </Grid>
  )
  }
}
export default Login;
