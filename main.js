const { app, Menu, Tray, Notification } = require('electron')

let msg = null

function showMsg(params) {
    msg.show()
}

let tray = null

app.on('ready', () => {

    msg = new Notification({
        title: 'hi there',
        body: 'I am the content'
    })

    tray = new Tray('./icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'last', type: 'normal', click: showMsg },
        { label: 'exit', type: 'normal', click: () => { app.exit() } }
    ])
    tray.setToolTip('click for more')
    tray.setContextMenu(contextMenu)

    let http = require('http')
    let server = http.createServer((req, res) => {
        var body = '';
        if (req.method == 'POST') {
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
                if (header != '' && detail != '') {
                    msg.title = header
                    msg.body = detail
                    msg.show()
                }
                res.statusCode = 200
                res.end()
            });
        } else {
            res.statusCode = 404
            res.end()
        }

    })
    server.listen(8080)
})