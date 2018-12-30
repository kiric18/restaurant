var gulp = require('gulp');
var es = require('event-stream');
var runSequence = require('run-sequence');
var chmod = require('gulp-chmod');
var paths = require('../paths');

gulp.task('copy-src', function() {
	return gulp.src([paths.srcDev])
    .pipe(gulp.dest(paths.root));
});

gulp.task('copy-config', function() {
	return gulp.src([paths.configDev])
	//.pipe(chmod(666)) or
	.pipe(chmod({owner:{write:true}}))
	//.pipe(fixConfigFile())
    .pipe(gulp.dest(''));
});

gulp.task('copy-assets', function() {
	return gulp.src([paths.assetDev])
    .pipe(gulp.dest(paths.asset));
});

gulp.task('pre-bundle', function(callback) {
  return runSequence(
    'clean',
    ['copy-src','copy-config','copy-assets'],
    callback
  );
});

function fixConfigFile() {
	return es.map(function(file, cb) {
		var fileContent = file.contents.toString();

		// determine if certain file contains certain lines...
		// if line is not found, insert the line.
		// optionally, delete some lines found in the file.
		
		//console.log(JSON.parse(fileContent));
		//console.log(JSON.parse(fileContent.substring(14,fileContent.length)));
	var d = '{' + fileContent.substring(19, 49) + '}';
		try{
			var str = d.replace(/(\r\n|\n|\r|\t|' ')/gm, '');
				//var a = JSON.parse(JSON.stringify(d));
				var a = JSON.parse(JSON.stringify({baseURL: "/SPA/forms/"}));
				
				console.log(JSON.stringify(str));
				
				console.log(JSON.stringify({baseURL: "/SPA/forms/"}));
				
				console.log(a.baseURL);
		}catch(e){
			console.log(e);
		}
		
		//var t = {baseURL: "/SPA/forms/",defaultJSExtensions: true,transpiler: "babel"}
		//console.log(d);
		
		
		// update the vinyl file
		file.contents = new Buffer(fileContent);

		// send the updated file down the pipe
		cb(null, file);
	  });
}