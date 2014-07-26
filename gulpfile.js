var gulp = require('gulp');
var sass = require('gulp-sass');

var path = "C:/git/gstvMarvel/";

//Compiles Sass files
gulp.task('sassyPants',function(event){
	var tag = 'task-sass: ';
	console.log(tag + ' compiling scss');
	return gulp.src(path + 'scss/bootstrap/stylesheets/bootstrap.scss')
		.pipe(sass())
		.pipe(gulp.dest(path + 'css'));

});
//Setup the watch
gulp.task('nightsWatch',function(){
	var tag = "task-watch: ";

	//Watch JS Files
	gulp.watch(path + 'js/*.js', function(event) {
	  	console.log('File '+event.path+' was '+event.type+', running tasks...');
	});
	//Watch bootstrap files
	gulp.watch(path + 'scss/bootstrap/stylesheets/**/*.scss', ['sassyPants']);
	gulp.watch(path + 'scss/harry/**/*.scss', ['sassyPants']);
});

//sets up default task
gulp.task('default', ['sassyPants','nightsWatch']);