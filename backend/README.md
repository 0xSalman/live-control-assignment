# Read Me

Live control sample backend service that resizes videos, persists resized videos' metadata to db. It also serves 
an express server which exposes two endpoints:

1. `/watch/:id` -> get metadata of a video
1. `/watch/:id/file` -> get binary file of a video

## Prerequisites

- [Docker](https://www.docker.com)
- [ffmpeg](https://ffmpeg.org/download.html)
- Node 12+

## Getting started

1. On terminal, navigate to directory where backend code is checked out
1. Start Postgres in a docker container via `docker-compose up`
1. Install node packages via `npm install`
1. Start server via `npm start`

## "Upload" a video

`resize-video.ts` script file lets you `upload` a video. It saves the resized video in `assets/videos/resized`
and video's metadata is persisted in a database table. 

You can resize a video via `npm run resize-video -- --file=/path/to/video` with optional arguments
- `--extension` - lets you specify video file extension
- `--title` - lets you specify video title

For example:

```console
npm run resize-video -- --file=assets/videos/sample/one.mp4 --extension=mp4 --title="video test 1"
npm run resize-video -- --file=assets/videos/sample/two.mp4 --title="video test 2"
```

The script will give you the video url that you can use to watch the video in the browser. Please note that
this will work **ONLY** when the frontend app is running.
