# Electron Http Notifier
[![Build Status](https://travis-ci.org/zentby/electron-http-notifier.svg?branch=master)](https://travis-ci.org/zentby/electron-http-notifier)

Cross platform and light-weight tray application. It allows you to show native desktop notification by http request.

## Usage

### Start Deamon

1. Run distributed app
2. Run with source code

```bash
git clone https://github.com/zentby/electron-http-notifier.git
cd electron-http-notifier
yarn start 
```

### Send Message

```bash
curl -X POST \
  http://127.0.0.1:8080 \
  -H 'Content-Type: application/json' \
  -d '{
    "title":"hello",
    "body": "world"
  }'
```

Use `HOST` and `PORT` environment variable to specify url and port number. By defaut it is listening to `http://localhost:8080`