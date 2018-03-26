const { app, Menu, Tray, Notification } = require('electron')

const isDarwin = process.platform === 'darwin';
const isLinux = process.platform === 'linux';
const isWindows = process.platform === 'win32';

let msg = null
let tray = null
let icon = './icon/icon.png'
let image = './icon/icon-512.png'

function showMsg(title, body) {
    if (title && body) {
        msg = new Notification({
            title: title,
            body: body,
            icon: image
        })
    }
    if (isWindows) {
        tray.displayBalloon({
            title: title,
            content: content
        })
    }
    if (msg != null) {
        msg.show()
    }
}

function createServer(endpoint) {
    endpoint = endpoint || '/'
    let http = require('http')
    let server = http.createServer((req, res) => {
        var body = '';
        if (req.url === endpoint && req.method === 'POST') {
            body = '';
            req.on('data', function(data) {
                body += data;
            });

            req.on('end', function() {
                var obj = null
                var header = '',
                    detail = ''
                try {
                    obj = JSON.parse(body)
                    header = obj.title
                    detail = obj.body
                } catch (error) {
                    res.statusCode = 400
                    res.end()
                }
                showMsg(header, detail)
                res.statusCode = 200
                res.end()
            });
        } else {
            res.statusCode = 404
            res.end()
        }

    })
    let port = process.env.PORT || 8080
    let host = process.env.HOST || 'localhost'
    server.listen(port, host)
}

app.on('ready', () => {
    if (isDarwin) {
        app.dock.hide()
    }
    let setting = app.getLoginItemSettings()
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'last', type: 'normal', click: () => { showMsg() } },
        {
            label: 'launch on login',
            type: 'checkbox',
            checked: setting.openAtLogin,
            click: (menuItem) => {
                app.setLoginItemSettings({ openAtLogin: menuItem.checked })
            }
        },
        { label: 'exit', role: 'quit' }
    ])
    tray.setToolTip('desktop http notifier')
    tray.setContextMenu(contextMenu)
    tray.on('right-click', () => { tray.popUpContextMenu() })

    createServer()
})