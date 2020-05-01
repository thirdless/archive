const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
   win = new BrowserWindow({
       width: 1100,
       height: 700,
       minHeight: 600,
       minWidth: 900,
       webPreferences: {
           webSecurity: false,
           nodeIntegration: true
       },
       frame: false,
       icon: __dirname + "/icon.ico"
   });
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'radio.html'),
      protocol: 'file:',
      slashes: true
  }));
}

//app.disableHardwareAcceleration();
app.on('ready', createWindow);
