// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

app.commandLine.appendSwitch('--enable-transparent-visuals');
app.commandLine.appendSwitch('--enable-parallel-downloading');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 400,
    minHeight: 450,
    width: 900,
    height: 700,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#ffffff',
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
      contextIsolation: false,
      javascript: true,
      enableRemoteModule: true,
    },
    show: false,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
  return mainWindow
}

function createOverlay(parentWindow) {
  const childWindow = new BrowserWindow({
    frame: false,
    minWidth: 400,
    minHeight: 450,
    width: 400,
    height: 450,
    transparent: true,
    parent: parentWindow,
    // titleBarStyle: "hidden",
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
      contextIsolation: false,
      javascript: true,
      enableRemoteModule: true,
    },
    skipTaskbar: true,
    show: true,
    focusable:false,
  })

  childWindow.loadFile('overlay.html')

  childWindow.setIgnoreMouseEvents(true, {forward:false});
  childWindow.setResizable(false)

  // childWindow.webContents.openDevTools({ mode: 'detach' });

  return childWindow
  
}
var parentWindow
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {


app.on("ready", () => {
  parentWindow = createWindow()
  parentWindow.show()
  this.childWindow = createOverlay(parentWindow)
  setTimeout(() => {
    this.childWindow.setContentBounds(parentWindow.getBounds())

    ipcMain.on("enable-mouse", () => {
      this.childWindow.setIgnoreMouseEvents(false)
      // parentWindow.setIgnoreMouseEvents(true, {forward:true})
    })
    ipcMain.on("disable-mouse", () => {
      this.childWindow.setIgnoreMouseEvents(true, {forward:false})
      
      // parentWindow.setIgnoreMouseEvents(false)
    })

    ipcMain.on("is-focused", (e) => {
      e.returnValue = parentWindow.isFocused()
    })
  }, 500)

})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
