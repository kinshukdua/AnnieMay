import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Card from 'react-bootstrap/Card';
import button from 'react-bootstrap/button';
import data from './data';
import Suggestion from './suggestion'
import Navbar from 'react-bootstrap/Navbar'
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      "id":0,
      "q_no":1,
      "que":true,
      "prev_id":null
    };
  }


  handleClick(new_id)
  {
    const p = this.state.id; 
    this.setState({"prev_id":p,"id":new_id,"q_no":this.state.q_no+1});
  }


  handleBack()
  {
    const p = this.state.prev_id;
    this.setState({"prev_id":null,"id":p,"q_no":this.state.q_no-1})
  }

  handleReset()
  {
    this.setState({"prev_id":null,"id":0,"q_no":1})
  }
  

  render()
  {
    var back_avail;
    var reset_avail = !this.state.id ? "none" : "inline-block"; 
    if (this.state.prev_id == null)
    {
      back_avail = "none";
    }
    else
    {
      back_avail = "inline-block";
    }
    var list_of_buttons = [];
    if (data[this.state.id].children.length > 1) {
      for ( var child_id of data[this.state.id].children)
      {
        list_of_buttons.push(
        <div>
          <button className='option' key={child_id} onClick={this.handleClick.bind(this, child_id)}>
           {data[child_id].text}
          </button>
          <br />
        </div>)
      }
        
        return (
        <div className='q_container'> 
              <h1 id ="question">{data[this.state.id].text}</h1>
              <hr />
              <p>Question no. {this.state.q_no}</p>
              <div  className="btn-container">
                {list_of_buttons}
              </div>
              <br />
              <button className = 'option-btn' onClick={this.handleBack.bind(this)} 
              style = {{display:back_avail,float: "left"}}>
                <i class="fas fa-arrow-left fa-2x"></i>
              </button>
              <button className = 'option-btn' onClick={this.handleReset.bind(this)} 
              style = {{display:reset_avail,float: "right"}}>
                <i class="fas fa-undo fa-2x"></i>
              </button>
        </div>
        );
    }
    else
    {
      return (<Suggestion name={data[data[this.state.id].children[0]].text} />);
    } 
  }
}

export default App;
