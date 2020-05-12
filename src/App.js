import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import data from './data';
import Suggestion from './suggestion'

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      "id":0,
      "q_no":1,
      "que":true
    };
  }


  handleClick(new_id)
  {
    
    this.setState({"id":new_id,"q_no":this.state.q_no+1});
  }


    
  

  render()
  {

    var list_of_buttons = [];
    if (data[this.state.id].children.length > 1) {
      for ( var child_id of data[this.state.id].children)
      {
        list_of_buttons.push(
        <Button key={child_id} onClick={this.handleClick.bind(this, child_id)} className="btn-block"  
        variant="primary" style = {{margin: "10px auto"}}>{data[child_id].text}
        </Button>
          )
      }
        
        return ( 
          <div className='align-item-center' style = {{textAlign:"center"}}>
            <Card style={{ margin:'25px', width: 'max-content'}} 
              className='shadow-lg p-3 mb-5 bg-white rounded mx-auto'>
            <Card.Body>
              <Card.Title style = {{fontSize: "45px"}}>{data[this.state.id].text}</Card.Title>
              <hr />
              <Card.Subtitle className="mb-2 text-muted">Question no. {this.state.q_no}</Card.Subtitle>
              <div  className="btn-group-justified btn-group-lg">
                {list_of_buttons}
              </div>
            </Card.Body>
            </Card>
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
