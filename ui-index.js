const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;


app.on('ready', () => {
    // Create window when app is ready

    mainWindow = new BrowserWindow({});
    // Load html file into the window.

    // Passing path to the load URL
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './windows/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
})