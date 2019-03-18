import React from 'react'
import { Grid, Header, Icon, Dropdown , Image} from 'semantic-ui-react';
import firebase from "../../firebase";
export default class UserPanel extends React.Component{

    state={
        user:this.props.currentUser
    }
    handleSignOut=()=>{
        firebase.auth().signOut().then(()=>{
            console.log("signed_out");
        })
    }
    dropdownOptions=()=>{
        return [{
            key:"user",
            text:<span>signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled:true
        },{
            key:"avatar",
            text:<span>Change Avatar</span>
        },{
            key:"signout",
            text:<span onClick={this.handleSignOut}>Sign Out</span>
        }]
    }
  render()
    {
    const {user}=this.state;    
    return (
     <Grid>
     <Grid.Column>
     <Grid.Row style={{padding:"1.2rem",margin:0}}>
     <Header as="h2" inverted>
     <Icon name="code"/>
     <Header.Content>Dev Chat</Header.Content>
     </Header>
     <Header as="h4" style={{padding:"0.2em"}} inverted>
     
     <Dropdown trigger={<span><Image src={user.photoURL} spaced="right" avatar/>
     {user.displayName}</span>} options={this.dropdownOptions()}/>
     </Header>
     </Grid.Row>
     </Grid.Column>
     </Grid>  )
    }
}
