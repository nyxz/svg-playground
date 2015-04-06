var gulp = require('gulp')
    gutil = require('gulp-util');


gulp.task('staticsvr', function() {
	var staticS = require('node-static');
	var server = new staticS.Server('./public');
	var port = 8182;
	require('http').createServer(function(req, res) {
		req.addListener('end', function() {
			server.serve(req, res);
		}).resume();
	}).listen(port, function() {
		gutil.log('Server listening on port: ' + gutil.colors.magenta(port));
	});
});

gulp.task('default', function() {
	gulp.start('staticsvr');
});
