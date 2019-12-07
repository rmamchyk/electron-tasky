const { app, ipcMain } = require('electron');
const path = require('path');
const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

const isWindows = process.platform === 'win32';
let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = isWindows ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('timer:update', (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
