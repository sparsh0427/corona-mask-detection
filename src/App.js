import React from 'react';
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js';

const paramOptions = 
{
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }

    }
  }
}

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  calculateFaceLocation = (data) =>{
    console.log('DATA = ',data)
    const pic = data.final_photo
    console.log('DATA = ',pic)
    const face = "data:image/jpeg;base64,"+pic 
    const image = document.getElementById('inputimage');
    var previous_url = image.src
    image.src = face
    if(pic != undefined || pic!= null){
      document.getElementById('result_pass').innerHTML='<p>FACE MASK DETECTED</p>'
      document.getElementById('result_fail').innerHTML='<p></p>'
    }
    else{
        document.getElementById('result_fail').innerHTML='<p>FACE MASK NOT DETECTED</p>'
        document.getElementById('result_pass').innerHTML='<p></p>'
        image.src = previous_url
      }
    }



  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input })
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://www.de-vis-software.ro/maskerizer.aspx'
    var user_name = 'your_user_name'
    var password = 'your_password'

    var encoded = btoa(user_name+":"+password)

    fetch(proxyUrl + targetUrl,{
      method: 'post',
      headers: {
        'Authorization':'Basic '+encoded, 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        "base64_Photo_String": "NO",
        "photo_url":this.state.input ,
        "boundingBoxCrop": "YES"
      })
    })
      .then(response => response.json())
      .then(data => this.calculateFaceLocation(data) )
      .catch(err => console.log(err));

  }

  render() {
    return(
      <div className="App">
          <Particles className='particles'
            params={paramOptions}
          />
        <div> 
          <Logo />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>  
        </div>
      </div>
    );
  } 
    
}

export default App;
