const Application = require('spectron').Application
const assert = require('assert')
const path = require('path')
var app = new Application({
    path: path.join(__dirname, '../node_modules/.bin/electron'),
    args: [path.join(__dirname, '..')],
    connectionRetryCount: 0
})
app.start().then(function() {
    console.log('started')
    describe('Application launch', function() {
        it('started', function() {
            assert.ok()
        })
    })
}).then(function() {
    console.log('stopped')
    return app.stop()
}).catch(function(error) {
    console.error('Test failed', error.message)
})