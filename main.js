const { app, Menu, Tray, Notification } = require('electron')
const server = require('./server')

const isDarwin = process.platform === 'darwin';
const isLinux = process.platform === 'linux';
const isWindows = process.platform === 'win32';

let msg = null
let tray = null
let icon = __dirname + '/tray.png'
let image = __dirname + '/icon.png'

function showMsg(title, body) {
    if (title || body) {
        msg = new Notification({
            title: title,
            body: body + '\n' + new Date().toLocaleString(),
            icon: image
        })
    }
    if (msg != null) {
        console.info("Message: " + msg.body)
        msg.show()
    }
}

app.on('ready', () => {

    if (isDarwin) {
        app.dock.hide()
    }
    let setting = app.getLoginItemSettings()
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Replay', type: 'normal', click: () => { showMsg() } },
        {
            label: 'Launch on Login',
            type: 'checkbox',
            checked: setting.openAtLogin,
            click: (menuItem) => {
                app.setLoginItemSettings({ openAtLogin: menuItem.checked })
            }
        },
        { type: 'separator' },
        { label: 'Exit', role: 'quit' }
    ])
    tray.setToolTip('desktop http notifier')
    tray.setContextMenu(contextMenu)
    tray.on('right-click', tray.popUpContextMenu)

    let url = server.createServer('/', showMsg)
    showMsg("Http Notifier", "Started to listening " + url)
})