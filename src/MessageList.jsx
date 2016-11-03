import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props.messages);
    return (
      <div id='message-list'>
      {//maps out all the messages on the server
        this.props.messages.map(function(p) {
         return (
          <Message message={p} key={p.id}/>
          )
        })
      }
      </div>
      )
       }
     }

     export default MessageList;