import React from 'react';
import {Link} from "react-router-dom";
import md5 from "md5";
import {Grid,Form,Button, Header,Icon, Segment,Message} from "semantic-ui-react";
import firebase from "../../firebase";

class Register extends React.Component{
    state={
     username:"",
     email:"",
     password:"",
     passwordConfirmation:"",
     errors:[],
     loading:false,
     userRef:firebase.database().ref("users")
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    
    }
    isFormEmpty=({username,email,password,passwordConfirmation})=>{
        if(!username || !email || !password || !passwordConfirmation)
            {
              return true;
            }
            return false;
    }
    isPasswordValid=({password,passwordConfirmation})=>{
        
        if(password !==passwordConfirmation)
        {
            return false;
        }else if(password.length <6 || passwordConfirmation.length<6)
        {  return false;
        }else
        {return true};
    }
    isFormValid=()=>{
        let errors=[];
        let error;
        if(this.isFormEmpty(this.state))
        {
          error={message:"Fill in All Fields"}
          this.setState({errors:errors.concat(error)});
          return false;
        }else if(!this.isPasswordValid(this.state)){
         error={message:"password is invalid"};
         this.setState({errors:errors.concat(error)});
         return false;
        }else{
            return true;
        }
    }
    saveUser=(createdUser)=>{
    return this.state.userRef.child(createdUser.user.uid).set({
        name:createdUser.user.displayName,
        avatar:createdUser.user.photoURL
    });
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.isFormValid())
{
   this.setState({errors:[],loading:true});
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((createdUser)=>{
        createdUser.user.updateProfile(({
                displayName:this.state.username,
                photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })).then(()=>{
                this.saveUser(createdUser).then(()=>{
                    console.log("user saved");
                });
                this.setState({loading:false});
            }).catch((error)=>{
          this.setState({errors:this.state.errors.concat(error)});
            })
            
        }).catch((err)=>{
            this.setState({loading:false,errors:this.state.errors.concat(err)})
        })
    }
    }
  displayErrors=(errors)=>{
    return errors.map((error,i)=><p key={i}>{error.message}</p>)
  } 
  handleInputErrors=(errors,inputName)=>{
  return errors.some((error)=>error.message.toLowerCase().includes(inputName))?"error":"";
  } 
   render()
    {
    const {password,email,username,passwordConfirmation,errors,loading}=this.state;    
   return (
    <Grid textAlign="center" verticalAlign="middle" className="App">
    <Grid.Column style={{maxWidth:450}}>
    <Header as="h1" icon color="orange" >
    <Icon name="puzzle piece" color="orange"></Icon>
     Register For DevChat
    </Header>
    <Form onSubmit={this.handleSubmit} size="large">
    <Segment stacked>
    <Form.Input fluid name="username" icon="user"  iconPosition="left" placeholder="Username"
    type="text" className={this.handleInputErrors(errors,"username")}
    onChange={this.handleChange} value={username}/>
    <Form.Input fluid name="email" icon="mail"  iconPosition="left" placeholder="Email Address"
    type="email" className={this.handleInputErrors(errors,"email")} onChange={this.handleChange} value={email}/>
    <Form.Input fluid name="password" icon="lock"  iconPosition="left" placeholder="Password"
    type="password" className={this.handleInputErrors(errors,"password")} onChange={this.handleChange} value={password}/>
    <Form.Input fluid name="passwordConfirmation" icon="repeat"  iconPosition="left" placeholder="Password Confirmation"
    type="password" className={this.handleInputErrors(errors,"password")}
    onChange={this.handleChange} value={passwordConfirmation}/>
    <Button disabled={loading} className={loading?"loading":""} color="orange" fluid size="large">Submit</Button>
    </Segment>
    </Form>
    {errors.length>0 && <Message error>
    <h2>
    Error
    </h2>
    {this.displayErrors(errors)}
    </Message>
    }
    
    
    <Message>Already a user?  <Link to="/login">Login</Link></Message>
    </Grid.Column>
    </Grid>
  )
  }
}
export default Register;
