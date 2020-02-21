import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import SaveForm from './SaveForm';
import Webcam from "react-webcam";

// const iframe = '<iframe src="https://my-website.com/page-with-webcam" allow="camera; microphone;"/>';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageData: null,
      image_name: "",
      saveImage: false
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    console.log("Image Captured from capture()")
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageData: imageSrc
    })
  }

  onClickRetake = (e) => {
    e.persist();
    this.setState({
      imageData: null
    })
  }

  onClickSave = (e) => {
    e.persist();
    this.setState((previousState) => {
      return {
        saveImage: !previousState.saveImage
      }
    })
  }

  // The handleChange callback allows the user to input a filename if they wish to using the SaveForm:
  handleChange = (e) => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveSubmit = (e) => {
    e.preventDefault();
    let imageObject = {
      image_name: this.state.image_name,
      image_data: this.state.imageData
    }
    console.log(`Image ${imageObject.image_name} would have been saved if you had a database setup dumbass!`)
  }

  saveForm = () => {
    return (
      <div>
        <form onSubmit={this.handleSaveSubmit}>
          <p>
            <label>Image Name: </label>
            <input type="text"
              name="image_name"
              value={this.state.image_name}
              onChange={this.handleChange} />
            <input type="submit" value="Save" />
          </p>
        </form>
      </div>
    )
  }

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <div className="App">
        <header className="App-header">
          <div sytle={{ marginTop: 0 }}>
            <Webcam
              audio={false}
              height={200}
              width={200}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <div className="button-container"><button onClick={this.capture}>Capture Photo</button> </div>
            {this.state.imageData ?
              <div>
                <p><img src={this.state.imageData} alt="Say Cheese" /></p>
                <span><button onClick={this.onClickRetake}>Retake ?</button></span>
                <span><button onClick={this.onClickSave}>Save</button></span>
                {this.state.saveImage ? this.saveForm() : null}
              </div>
              : null}
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
