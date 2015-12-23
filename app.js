var express = require('express');
var exec = require('child_process').exec;

var port = process.env.PORT || 1337;
var server = express();

process.env.R_WEB_DIR = process.env.R_WEB_DIR || (process.cwd() + '/public');
console.log('R_WEB = ' + process.env.R_WEB_DIR);

server.use(express.static(__dirname + '/public'));

// Child process will be created only on users request
server.get('/', function(req, res) {
    var child = exec('Rscript script/xyplot.R', function(error, stdout, stderr) {
        if (stdout) {
            console.log('stdout: ' + stdout);
        }
        if (stderr) {
            console.log('stderr: ' + stderr);
        }
        if (error) {
            res.status(500).send({error: 'something terrible happened'});
            console.log('exec error: ' + error);
            return;
        }
        // send adds content type automatically
        res.send('R graph<br><img src="/xyplot.png"/><br>end of R script');
    });
});

server.listen(port, function() {
    console.log('Server is running at http://127.0.0.1:' + port);
});
