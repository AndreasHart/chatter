import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx'
import UserCounter from './userCounter.jsx'
import uuid from 'node-uuid'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [ ],
      userCount:0,
    };
  };

  handleEnter (newMsg){
    console.log("app.js", this)
    const messages = this.state.messages.concat(newMsg)
    this.socket.send(JSON.stringify(newMsg));
  };
  //takes the message and detrimes what to do with it wdepending on the type
  renderMsg(ev){
    const newMsg = JSON.parse(ev.data)
    console.log("newMsg",newMsg.type);
    if(newMsg.type == "userCount"){
      this.setState({userCount:newMsg.value})
    }else if(newMsg.type == "postMsg"){
      const messages = this.state.messages.concat(newMsg)
      this.setState({messages:messages})
    }else if(newMsg.type == "postNotice"){
      newMsg.username='';
      const messages = this.state.messages.concat(newMsg);
      this.setState({messages:messages})
    }
  }
  // once the page loads connect the websocked
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function(ev) {
      console.log("Connected to server!");
    }
    var renderMsg = this.renderMsg.bind(this);
    this.socket.onmessage = function(ev) {
      renderMsg(ev);
    }
  }


  render() {
    console.log("Rendering <App/>");

    return (

      <div className="wrapper">
      <nav>
      <div><h1>Chatty</h1></div>
      <UserCounter counter={this.state.userCount} />
      </nav>
      <MessageList  username={this.state.currentUser} messages={this.state.messages}/>
      <Chatbar  username={this.state.currentUser.name} onEnter={this.handleEnter.bind(this)}/>

      </div>
      );
    }

  }
  export default App;
