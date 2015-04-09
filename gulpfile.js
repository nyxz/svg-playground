var gulp = require('gulp')
    gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	clean = require('gulp-clean'),
	sass = require('gulp-ruby-sass');


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

gulp.task('sass', function() {
	return sass('./src/sass/style.scss', {
			loadPath: './',
			style: 'expanded',
			lineNumbers: true
		})
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});

gulp.task('build', function() {
	gulp.start('sass');
});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gutil.log('Watching for changes...');
});

gulp.task('clean', function() {
	return gulp.src('./public/css/style.css', {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean', 'build', 'staticsvr'], function() {
	gulp.start('watch');
});
