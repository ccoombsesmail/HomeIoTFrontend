import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {JSEncrypt} from "jsencrypt";


var CryptoJS = require("crypto-js");

 const chars =
`0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmn
 opqrstuvwxyz*&-%/!?*+=()`;

 const publicKey = `-----BEGIN PUBLIC KEY-----
 MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1hzREvR95DPQT2GqHPK4
 L2gMGjJXMVWnuGE2oiq2XXldZ66yJONlIgQygVl3e7fxrcef7BYtUwLm7Y5amlf1
 pigxsqjzE5z7JR7mFY0mxEPOBTy/RwWmQt5a/FmDUL2RITjDDtgMdwiG4kxW+5+g
 Qb2FU3++Y1128XUkFRAk1BkxFgYpme2E44EMKtreLvNyNLYY97I9nqSMhU8aPPsw
 vOznKtfrf3h97EsOooGKDneAU0cXyaqzkHZudEslHY1tAC9DZeIUni+Vv/7XphfY
 PtlqyqW5OR2/pjAggRkp857mBHBqBd91TYZw2ZsD3AHS7kL86JGAElF8WIkVxFyl
 mTQn/soRb63c+SGuXXsn5EqSji9cVfP59/ec7YGWlHFDFxHfLC1BGnLcVFJgLTW0
 qRQ4Cuy8Bvttey3bFnaCDDaOOH3NkMh8Vc7AfUzJEjZtxv0+rXiPUbiJSZoRUdNZ
 pc1gWD8tUenPA7F/aGPbcIziDVEmx1YWR/HSaU6J/ZTO/hmxI4VJyu559IDVY6zr
 e4kCw7WXYzShaS/zUyFSiZ0y2a4kU+qIH4q/UNi03gudGc1KeoukmPPiAm6fpOJH
 VeoypUMV3147fQtoGLCrYFJv9+3dhNE38PgF6atWoOt2GQjoB3S/vi7WlWDlBXw5
 sc8x6LHhFRCcwDaAhjDg/wkCAwEAAQ==
 -----END PUBLIC KEY-----`;

class App extends Component {

  state = {

    arr: []
  };



generateKey(keyLength){

var randomstring = '';

for (var i=0; i < keyLength; i++) {
  var rnum = Math.floor(Math.random() * chars.length);
  randomstring += chars.substring(rnum,rnum+1);
}
return randomstring;
};

encrypt(dataString, publicKey) {
 
  // Create a new encryption key (with a specified length)
  var key = this.generateKey(50);
 
  // encrypt the data symmetrically 
  // (the cryptojs library will generate its own 256bit key difference than the key passed)

  var aesEncrypted = CryptoJS.AES.encrypt(dataString, key);
  // get the symmetric key and initialization vector from
  // (hex encoded) and concatenate them into one string
  /// ::: can be used on the go server to split

  var aesKey = aesEncrypted.key + ":::" + aesEncrypted.iv;
  // the data is base64 encoded 
  var encryptedMessage = aesEncrypted.toString();

  // we create a new JSEncrypt object for rsa encryption
  var rsaEncrypt = new JSEncrypt();


  // we set the public key (which we passed into the function)
  rsaEncrypt.setPublicKey(publicKey);
  // now we encrypt the key & iv with our public key
  var encryptedKey = rsaEncrypt.encrypt(aesKey);
  // and concatenate our payload message
  var payload = encryptedKey + ":::" + encryptedMessage;
  return payload;

};




  Pressme = (e) => {


   
    var currentState = this.state.arr;

    if (String(e.key) === "Enter") {

      const http = new XMLHttpRequest();
      http.open("POST", "http://localhost:5000/");
      http.setRequestHeader("Content-Type", "application/json");

      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          window.location.replace("http://localhost:5000/dash/");
        }
        return
      }
      
      var payload = this.encrypt(CryptoJS.SHA256(String(this.state.arr.join(""))).toString(CryptoJS.enc.Hex), publicKey)
     // var message = "THIS IS A GAY MESSAGE"
    //  var payload = this.encrypt(message.toString(CryptoJS.enc.Hex), publicKey)
      http.send(payload);


    } else if (this.state.arr.length === 11) {

  
      this.state.arr.shift();
      currentState.push(String(e.key).toUpperCase());
      this.setState({ arr: currentState });

    } else  {
      
      currentState.push(String(e.key).toUpperCase());
      this.setState({ arr: currentState });
    }

    

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
