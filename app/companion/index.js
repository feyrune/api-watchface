import { settingsStorage } from "settings";
import * as messaging from "messaging";

console.log("Companion Started");

let renderAllPoints = true
let url = null;

  // Message socket opens
messaging.peerSocket.onopen = () => {

  console.log("Companion Socket Open");
  restoreSettings();
  renderAllPoints = true;
  test();

};  

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("Companion Socket Closed");
};


const test = () => {
  console.log('TEST IS A CONNECTION')
  console.log(url)
  if(url) {
    //url = url + "?count=14";
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        "Content-Type": 'application/json; charset=utf-8'
      })
    })
      .then(response => {
        console.log('Get Data On Phone');
        response.text().then(data => {
          console.log('fetched Data from API');
          sendVal(data);


        })
        .catch(responseParsingError => {
          console.log('fetchError');
          console.log(responseParsingError.name);
          console.log(responseParsingError.message);
          console.log(responseParsingError.toString());
          console.log(responseParsingError.stack);
        });
      }).catch(fetchError => {
        console.log('fetchError');
        console.log(fetchError.name);
        console.log(fetchError.message);
        console.log(fetchError.toString());
        console.log(fetchError.stack);
      })
  }
};



// A user changes settings
settingsStorage.onchange  = evt => {
  console.log(evt.key)
  if(evt.key === "text") {
  console.log('REST URL RECIEVED')    
    let data = {
      key: evt.key,
      newValue: evt.newValue
    };
    restoreSettings();
    test()
    renderAllPoints = true;
  }
  // sendVal(data);
  console.log('key pressed')
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      if(JSON.parse(settingsStorage.getItem(key)).name) {
           console.log(JSON.parse(settingsStorage.getItem(key)).name)
           url = JSON.parse(settingsStorage.getItem(key)).name;
      }
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  console.log('in sendVal')
  //console.log(JSON.parse(data).length) 

  if(renderAllPoints) {
    for(let index = 13; index >= 0; index--) {
      
      console.log( JSON.parse(data)[index])
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          console.log('Sending Values')
          messaging.peerSocket.send(JSON.parse(data)[index]); 
        
      }
      
    }
      renderAllPoints = false;

  } else {
        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
            messaging.peerSocket.send(JSON.parse(data)[0]); 
        }
  }

}

setInterval(test,  300000); // test again 5 min later


