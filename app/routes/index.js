var router = require('express').Router(),
    ffmpeg = require('fluent-ffmpeg'),
    winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { 'timestamp': true });

router.get('/stream', function (req, res, next) {
    var rtmpUrl = req.query.rtmp;
    var loopCount = req.query.loop; 
    var loopInput = new Array(2); 

    if (loopCount) {
        var loopCommand = new String('-stream_loop ' + loopCount);
        loopInput = [
            loopCommand
          ];
    }

    winston.info("Sending stream flow to [" + rtmpUrl + "] and loop command [" + loopInput + "]");

    ffmpeg('./app/media/official_test_source_2s_keys_24pfs.mp4')
        .inputOptions(loopInput)
        .videoCodec('copy')
        .usingPreset('flashvideo')
        .on('start', function () {
            let data = JSON.stringify({
                action: 'ffmpeg',
                data: 'Starting...',
            })
            winston.info(data);
            res.write(data);
        })
        .on('progress', function (progress) {
            let data = JSON.stringify({
                action: 'Processing',
                data: progress.percent,
            })
            winston.info(data);
            res.write(data);
        })
        .on('end', function (stdout, stderr) {
            let log = JSON.stringify({
                action: 'ffmpeg',
                data: 'Transcoding succeeded',
            });
            winston.info(log);
            res.end(log);
        })
        .on('error', function (err) {
            let log = JSON.stringify({
                error: 'ffmpeg',
                message: err.message,
            });

            winston.error(log);

            res.writeHead(500, { 'Connection': 'close' });
            res.end(log);
        }).save(rtmpUrl);

});

module.exports = router;