import React, { Component } from 'react';
import './App.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

import {  Button, 
          Icon, 
          Container, 
          // Grid, 
          // Image, 
          // Divider,
          // Item 
        } from 'semantic-ui-react'

class App extends Component {

  constructor() {
    super();
    this.state = {
      randomWord: 'FETCHING WORD. PLEASE WAIT...'
    }
  }

  onListenClick() {
     fetch('http://localhost:3002/api/speech-to-text/token')
      .then(function(response) {
          return response.text();
      }).then((token) => {
        // console.log('token is: ', token);
        var stream = recognizeMic({
          token: token,
          object_mode: false
        });
        stream.setEncoding('utf8'); // get text instead of Buffers for on data events
        stream.on('data', (data) => {          
          // data = data.replace(/[^\w\s]/gi, '');
          data = data.toUpperCase();
    
          this.setState( {randomWord : data} )
        });
        stream.on('error', function(err) {
            console.log(err);
        });
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      }).catch(function(error) {
          console.log(error);
      });
  }

  render() {
    const {randomWord} = this.state;

    return (
      <div className="App">

        <Container style={{paddingTop: '15px'}}>

          <div className="ui grid">

            <div className="one column large screen only row">
              <div className="column">
                <div className="ui segment">

                  <div style={{
                      border:'2px solid #e1e1e1', 
                      padding: '50px',
                      backgroundColor: '#eeeeee',
                      borderRadius: '2px',
                      textAlign: 'center',
                      fontSize: '50px',
                      color: '#ae432e',
                    }} >
                     {randomWord} 
                  </div>
                    
                </div>                  

              </div>              
            </div>

            <div className="one column large screen only row">
              <div className="column">
                <div className="ui segment" style={{textAlign: 'center'}}>

                  <Button style={{fontSize: '30px'}} icon labelPosition='left' onClick={this.onListenClick.bind(this)}>
                    <Icon name='microphone' />
                    Start
                  </Button> 

                  <Button style={{fontSize: '30px'}} icon labelPosition='left' id="stop">
                    <Icon name='stop' />
                    Stop
                  </Button>   

                </div>                  
              </div>              
            </div> 

          </div>  

        </Container>                       

      </div>
    );
  }
}

export default App;
