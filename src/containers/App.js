import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
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
          console.log(data);
          data = data.replace(/[^\w\s]/gi, '');
          
          this.setState( {text : data} )
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <button onClick={this.onListenClick.bind(this)}>Listen to microphone</button>
       <button id="stop"> STOP </button>
       <div className="f1">{this.state.text}</div>

      </div>
    );
  }
}

export default App;
