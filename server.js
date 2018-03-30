const http = require('http')
module.exports = {
    createServer: function(endpoint, showMsg) {
        endpoint = endpoint || '/'
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
}