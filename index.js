const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const TimerTray = require('./app/TimerTray');

const isWindows = process.platform === 'win32';
let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const iconName = isWindows ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});
