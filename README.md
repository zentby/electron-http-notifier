# Electron Http Notifier
[![Build Status](https://travis-ci.org/zentby/electron-http-notifier.svg?branch=master)](https://travis-ci.org/zentby/electron-http-notifier)

Cross platform and light-weight tray application. It allows you to show native desktop notification by http request.

## Install

```bash
npm install
npm start
```

## Usage

```bash
curl -X POST \
  http://127.0.0.1:8008 \
  -H 'Content-Type: application/json' \
  -d '{
    "title":"hello",
	"body": "world"}'
```

# TODO

- [x] Support left/right click
- [x] Change icon
- [x] Stay in system notifications
- [x] Environment variable for configs
- [x] Hide from taskbar
- [x] Publish repository
- [ ] Config file
- [ ] Title/Body Format
- [ ] *Message History
- [ ] *Config UI
