import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
  

  render()
  {
    var back_avail;
    if (this.state.prev_id == null)
    {
      back_avail = "none";
    }
    else
    {
      back_avail = "block";
    }
    var list_of_buttons = [];
    if (data[this.state.id].children.length > 1) {
      for ( var child_id of data[this.state.id].children)
      {
        list_of_buttons.push(
        <Button key={child_id} onClick={this.handleClick.bind(this, child_id)} className="btn-block"  
        variant="danger" style = {{margin: "10px auto"}}>{data[child_id].text}
        </Button>

          )
      }
        
        return (
        <div> 
          <Navbar variant="dark" bg='dark' className="justify-content-center">

            <Navbar.Brand>
              <img
                alt=""
                src="https://seeklogo.com/images/F/Fullmetall_Alchemist_anime-logo-59840B9E1F-seeklogo.com.png"
                width="30px"
                height="30px"
                className="d-inline-block align-top"
              />   {'\t'}      
                          Annie May's Opinions
            </Navbar.Brand>
            
          </Navbar>
          
          <div className='align-item-center' style = {{display: 'block', textAlign:"center"}}>
            <Card border = 'info' style={{ margin:'25px', width: 'fit-content'}} 
              className='shadow-lg p-3 mb-5 bg-white rounded mx-auto'>
            <Card.Body>
              <Card.Title style = {{fontSize: "45px"}}>{data[this.state.id].text}</Card.Title>
              <hr />
              <Card.Subtitle className="mb-2 text-muted">Question no. {this.state.q_no}</Card.Subtitle>
              <div  className="btn-group-justified btn-group-lg">
                {list_of_buttons}
              </div>
              <Button className = 'brk-btn' onClick={this.handleBack.bind(this)} style = {{display:back_avail,float: "left",  borderRadius:"0%"}}><i class="fas fa-arrow-left"></i></Button>
            </Card.Body>
            </Card>
          </div>
          <Navbar className='py-0' fixed='bottom' bg = 'dark' variant='dark'>
            <Navbar.Text>Made by Kinshuk Dua, 2020</Navbar.Text>
          </Navbar>
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
