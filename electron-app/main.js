const { app, BrowserWindow } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    icon: "icon.ico",
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    backgroundColor: "#404545",
    // kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },

  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
function exit() {
 this.app.quit();
}
