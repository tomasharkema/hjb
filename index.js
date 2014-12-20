var gm = require('gm').subClass({ imageMagick: true });

var express = require('express')
var app = express()    
app.get('/:string', function(req, res, next){

	var string = req.params.string;
	gm('hjb.png')
		.fontSize(80)
		.font("Impact.ttf")
		.fill("#fff")
		.stroke("#000")
		.strokeWidth(3)
		.drawText(0, 0, string.toUpperCase(), "North")
        .stream(function streamOut (err, stdout, stderr) {
            if (err) return next(err);
            stdout.pipe(res); //pipe to response

            // the following line gave me an error compaining for already sent headers
            //stdout.on('end', function(){res.writeHead(200, { 'Content-Type': 'ima    ge/jpeg' });}); 

            stdout.on('error', next);
    });
});

app.listen(process.env.PORT || 3000);