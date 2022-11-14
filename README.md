# ffmpeg web service API

A web service for converting video files using Nodejs, Express and FFMPEG

## Docker image

https://hub.docker.com/repository/docker/bigmoby/web-ffmpeg

## Endpoints

Convert demo video file in rtmp stream. `loop` param for loop count assignment, it's not mandatory.

> GET /stream?rtmp=[RTMP-URL]&loop=[LOOP-COUNT]

> GET /readme - Web Service Readme

## Example

Build the Docker container:
```bash
docker build -t bigmoby/web-ffmpeg:latest 
```

Run the Docker container:
```bash
docker run -p 80:3000 bigmoby/web-ffmpeg:latest 
```

Invoke the RTMP conversion: 

```bash
curl --location --request GET 'http://192.168.1.31/stream?rtmp=rtmp://bc.msmdn.net/event/XXXXXXXXX/YYYYYYYYYYY'
```

```bash
curl --location --request GET 'http://192.168.1.31/stream?rtmp=rtmp://bc.msmdn.net/event/XXXXXXXXX/YYYYYYYYYYY&loop=3'
```