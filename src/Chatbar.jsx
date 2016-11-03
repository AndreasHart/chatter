import React, {Component} from 'react';
import uuid from 'node-uuid'
class Chatbar extends Component {
  state={NewMessage:"",
  name:this.props.username,
  oldname:this.props.username}

  constructor(props){
    super(props);
    this.updateNewMessage = this.updateNewMessage.bind(this);
    this.updateNewName = this.updateNewName.bind(this);
    //this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('this in _handleKeyPress',this);

      if(this.state.name !== this.state.oldname){
        console.log('comapare names');
        const MSG={
          type:'postNotice',
          username:this.state.name,
          oldname:this.state.oldname,
          content:this.state.NewMessage
        }
        this.setState({oldname: this.state.name});
        console.log('onenter',this)
        this.props.onEnter(MSG)
      }else{
        const MSG={
          type:'postMsg',
          username:this.state.name,
          content:this.state.NewMessage
        }
        this.props.onEnter(MSG)
      }
    }
  }

  updateNewMessage(e) {
    this.setState({NewMessage: e.target.value});
  }

  updateNewName(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <footer>
      <input id="username" type="text" value={this.state.name} onChange={this.updateNewName} placeholder={this.props.username}/>
      <input id="new-message" onKeyPress={this._handleKeyPress.bind(this)} type="text" value={this.state.NewMessage} onChange={this.updateNewMessage} placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }
  export default Chatbar;

