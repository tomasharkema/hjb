var gm = require('gm').subClass({ imageMagick: true });

var express = require('express')
var app = express()
app.get(['', '/:string'], function(req, res, next){

	var string = req.params.string || req.query.text || "";
	var splitted = string.split(" ");
	var i = 0;
	var str = "";
	splitted.forEach(function(s){
		if (i%2){
			str += " "+s;
		} else {
			str += "\n"+s;
		}
		i++;
	});
	gm('hjb.png')
		.fontSize(80)
		.font("Impact.ttf")
		.fill("#fff")
		.stroke("#000")
		.strokeWidth(3)
		.drawText(0, 0, str.toUpperCase(), "North")
        .stream(function streamOut (err, stdout, stderr) {
            if (err) return next(err);
            res.writeHead(200, {'Content-Type':'image/png'});
            stdout.pipe(res); //pipe to response

            // the following line gave me an error compaining for already sent headers
            //stdout.on('end', function(){res.writeHead(200, { 'Content-Type': 'ima    ge/jpeg' });});

            stdout.on('error', next);
    });
});

app.listen(process.env.PORT || 3000);
