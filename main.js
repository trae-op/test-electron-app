// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, powerMonitor} = require('electron')
const path = require('path')

const pathIcons = 'build/icons';
const iconsDir = path.join(__dirname, `./${pathIcons}/`);
const pathTrayIcon = path.join(iconsDir, 'icon_tray.png');

let tray = null;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // init icon tray
  tray = new Tray(pathTrayIcon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' }
  ])
  tray.setToolTip('Это мое приложение.')
  tray.setContextMenu(contextMenu)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  powerMonitor
      .on('suspend', () => {
        console.log('The system is going to sleep');
        console.log('getSystemIdleTime:', powerMonitor.getSystemIdleState(10));
      })
      .on('resume', () => {
        console.log('getSystemIdleTime:', powerMonitor.getSystemIdleTime());
      })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
