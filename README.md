# ffmpeg web service API

A web service for converting video files using Nodejs, Express and FFMPEG

## Docker image

https://hub.docker.com/bigmoby/TODO

## Endpoints

> GET /stream?rtmp=[RTMP-URL] - Convert demo video file in rtmp stream

> GET /readme - Web Service Readme

## Example

```bash
curl --location --request GET 'http://192.168.1.31/stream?rtmp=rtmp://bc.msmdn.net/event/XXXXXXXXX/YYYYYYYYYYY'
```