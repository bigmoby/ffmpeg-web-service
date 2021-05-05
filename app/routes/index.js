var router = require('express').Router(),
    ffmpeg = require('fluent-ffmpeg'),
    winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { 'timestamp': true });

router.get('/stream', function (req, res, next) {
    ffmpeg('./app/media/official_test_source_2s_keys_24pfs.mp4').native().audioCodec('copy').format('flv')
        .on('progress', function (progress) {
        let data = JSON.stringify({
                                   action: 'Processing',
                                   data: progress.percent,
                               })
            winston.info(data);
            res.send(data);
        })
        .on('end', function (stdout, stderr) {
            winston.info(JSON.stringify({
                action: 'Transcoding',
                data: 'succeeded',
            }));
        })
        .on('error', function (err) {
            let log = JSON.stringify({
                error: 'ffmpeg',
                message: err,
            });

            winston.error(log);

            res.writeHead(500, { 'Connection': 'close' });
            res.end(log);
        }).output('rtmp://bc.msmdn.net/event/S65478945/1017034951').run()

});

module.exports = router;