import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


var CryptoJS = require("crypto-js");


class App extends Component {

  state = {

    arr: []
  };




  Pressme = (e) => {


    var currentState = this.state.arr;
    if (this.state.arr.length === 11 && String(e.key) === "Enter") {


      /*
     var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1d");
     var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
     var encrypted = CryptoJS.AES.encrypt("Message", key, { 
      padding: CryptoJS.pad.NoPadding,
      iv: iv,
     });
*/
      // console.log("Ho")

      const http = new XMLHttpRequest();
      http.open("POST", "http://localhost:5000/");
      http.setRequestHeader("Content-Type", "application/json");

      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          window.location.replace("http://localhost:5000/dash/");
        }
        return
      }
      /*  const body = JSON.stringify({

       DATA: String(this.state.arr),

     });  */
      // const body = String(this.state.arr.join(""))
      const body = CryptoJS.SHA256(String(this.state.arr.join(""))).toString(CryptoJS.enc.Hex)
      // const body = encrypted;

      http.send(body);
      this.state.arr.shift();


    } else if (this.state.arr.length === 11 && String(e.key) !== "Enter") {
      //console.log("Ho");

      this.state.arr.shift();

    }

    currentState.push(String(e.key).toUpperCase());
    this.setState({ arr: currentState });

    console.log(e.key, this.state.arr, this.state.arr.length)



  };



  render() {

    //console.log(CryptoJS.SHA256("I LOVE COCK").toString(CryptoJS.enc.Hex));


    return (

      <div className="App" onKeyDown={this.Pressme} tabIndex="0" >

        {/* <button onClick = {this.pressme}>I Love D </button> */}



      </div>
    );

  }
}

export default App;
