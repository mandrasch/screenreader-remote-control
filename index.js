const { app, BrowserWindow } = require('electron');
const path = require('path');
const myip = require('quick-local-ip');
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const fs = require("fs");
const applescript = require('applescript');
const { contextIsolated } = require('process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Config
const Config = {
  http_port: '8080',
  socket_port: '3030'
};

// Http server
const _app = express();
const server = require('http').Server(_app);
server.listen(Config.http_port);

// WSS server
const wss = new WebSocket.Server({ port: Config.socket_port });

// Console print
console.log('[SERVER]: WebSocket on: ' + myip.getLocalIP4() + ':' + Config.socket_port); // print websocket ip address
console.log('[SERVER]: HTTP on: ' + myip.getLocalIP4() + ':' + Config.http_port); // print web server ip address

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/electron-app/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

/**
 * EXPRESS
 */
_app.use(bodyParser.urlencoded({
  extended: false
}));

_app.use('/assets', express.static(__dirname + '/remote-control-app/assets'))

_app.get('/', function (req, res) {
  res.sendFile(__dirname + '/remote-control-app/index.html');
});

/**
* WEBSOCKET
*/
wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4();
};

// TODO: authenticate with ID / secret key

wss.on('connection', function connection(ws, req) {
  ws.id = wss.getUniqueID();

  ws.on('close', function close() {
    console.log('[SERVER]: Client disconnected.');
  });

  ws.on('message', function incoming(incomingData) {
    console.log('[SERVER] Message:', incomingData.toString());
    
    incomingData = JSON.parse(incomingData.toString());

    let appleScriptCommand = '';
  
    if ("action" in incomingData) {
      
      // key codes https://eastmanreference.com/complete-list-of-applescript-key-codes

      switch (incomingData.action) {
        case 'triggerOpenExampleWebsite':

          applescript.execFile(path.join(__dirname, "/apple-scripts/open_example_website.applescript"), (err, rtn) => {
            if (err) {
              // Something went wrong!
              console.log('error', err);
            }
            console.log('executed', rtn);
          });
          //appleScriptCommand = 'tell application "Safari" to open location "https://www.gov.uk/"'; // does not activate it
          break;
        case 'triggerActivateVoiceOver':
          appleScriptCommand = 'tell application "System Events" to key code 96 using {command down}';
          break;
        case 'triggerGoIntoWebContentArea':
          // VO + SHIFT + down arrow
          appleScriptCommand = 'tell application "System Events" to key code {57, 124} using {option down, control down}';
          break;
        case 'triggerFocusNext':
          appleScriptCommand = 'tell application "System Events" to key code 48';
          break;
        case 'triggerFocusPrev':
          appleScriptCommand = 'tell application "System Events" to key code 48 using {shift down}';
          break;
        case 'triggerEnter':
          appleScriptCommand = 'tell application "System Events" to key code 76';
          break;
        case 'triggerReadStart':
          // VO + A
          appleScriptCommand =  'tell application "System Events" to key code 0 using {option down, control down}';
          break;
        case 'triggerReadNext':
          appleScriptCommand =  'tell application "System Events" to key code 124 using {option down, control down}';
          break;
        case 'triggerReadPrev':
          appleScriptCommand =  'tell application "System Events" to key code 123 using {option down, control down}';
          break;
        case 'triggerReadStop':
          appleScriptCommand =  'tell application "System Events" to key code 59';
          break;
        case 'triggerJumpToTop':
          // VO + Fn + Left Arrow
          appleScriptCommand =  'tell application "System Events" to key code { 123 , 63} using {option down, control down}';
          break;
        default:
          console.log('Error: unknown action', incomingData);
          break;
      }

      applescript.execString(appleScriptCommand, (err, rtn) => {
        if (err) {
          // Something went wrong!
          console.log('Error executing apple script command:', err);
        }
        console.log('Executed apple script command', rtn);
      });
    }
    // Example use
    // send(recieveData);
    // sendAll(incomingData);
    // TODO: return success?
  });

  // Send back to client
  function send(data) {
    data = JSON.stringify(data);
    ws.send(data);
  }

  // Send to all clients
  function sendAll(data) {
    data = JSON.stringify(data);

    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  }
});


/* 
* Shortcut actions for mac / voice over
*/

let triggerActionRead = function (nextOrPrev) {

  console.log('TRIGGER TO READ', nextOrPrev);

  const script0 =
    'tell application "System Events" to key code 124 using {option down, control down}'

  applescript.execString(script0, (err, rtn) => {
    if (err) {
      // Something went wrong!
      console.log('error', err);
    }
    console.log('executed', rtn);
  });

  return;

  //const script = 'tell application "Google Chrome" to open location "https://hilfsgemeinschaft.at"'

  // VO-A -> read all

  const script = 'tell application "System Events" to key code 48 using {command down}';
  // TAB
  const script2 =
    'tell application "System Events" to key code 48';
  // VO combination + Right Arrow
  const script3 =
    'tell application "System Events" to key code 124 using {option down, control down}'

  applescript.execFile(path.join(__dirname, "/apple_scripts/read_whole_page.applescript"), (err, rtn) => {
    if (err) {
      // Something went wrong!
      console.log('error', err);
    }
    console.log('executed', rtn);
  });
}


/*
* IPC Bridge
*/

// TODO: send ip to electron-frontend