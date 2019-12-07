const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

const isWindows = process.platform === 'win32';
let mainWindow;
let tray;

app.on('ready', () => {
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

  const iconName = isWindows ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      const yPosition = isWindows ? y - height: y;
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width 
      });
      mainWindow.show();
    } 
  });
});
