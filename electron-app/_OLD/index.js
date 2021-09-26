const { app, BrowserWindow, ipcMain, systemPreferences } = require('electron');
const path = require('path');
const fs = require("fs");
const applescript = require('applescript');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  console.log('Fire it up ...');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // false is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

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
// event channels must be whitelisted in preload.js

ipcMain.on("triggerActionRead", (event, nextOrPrev) => {
  console.log('TRIGGER TO READ', nextOrPrev);

  const script0 = 
  'tell application "System Events" to key code 124 using {option down, control down}'

  applescript.execString(script0, (err, rtn) => {
    if (err) {
      // Something went wrong!
      console.log('error',err);
    }
    console.log('executed',rtn);
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
      console.log('error',err);
    }
    console.log('executed',rtn);
  });

  /*applescript.execString(script, (err, rtn) => {
    if (err) {
      // Something went wrong!
      console.log('error',err);
    }
    console.log('executed',rtn);
  });

  

  applescript.execString(script2, (err, rtn) => {
    if (err) {
      // Something went wrong!
      console.log('error',err);
    }
    console.log('executed',rtn);
  });*/

  

});

/*ipcMain.on("toMain", (event, args) => {
  console.log('TRIGGER TO MAIN');
  mainWindow.webContents.send("fromMain", { "test": "123" });
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    mainWindow.webContents.send("fromMain", responseObj);
  });
});*/

