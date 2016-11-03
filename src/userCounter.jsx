import React, {Component} from 'react';

class UserCounter extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("Rendering <Message/>");
    return (
      <span className="value">{this.props.counter} users online</span>
      );
    }
  }

  export default UserCounter;
