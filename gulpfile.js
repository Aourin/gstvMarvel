var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

var path = "C:/git/gstvMarvel/";

//Compiles Sass files
gulp.task('sassyPants',function(event){
	var tag = 'task-sass: ';
	console.log(tag + ' compiling scss');
	
	var bootstrap = gulp.src(path + 'scss/bootstrap/stylesheets/bootstrap.scss')
		.pipe(sass())
		.pipe(gulp.dest(path + 'public/css'))
	var harry = gulp.src(path + 'scss/harry/harry.scss')
		.pipe(sass())
		.pipe(gulp.dest(path + 'public/css'));
	return merge(bootstrap,harry);
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
	gulp.watch(path + 'gulpfile.js',['default']);
});

//Compile JS
gulp.task('scripts', function() {
  var bower = './bower_components/';
  gulp.src([
  	bower + 'angular/angular.min.js', 
  	bower + 'angular-bootstrap/ui-bootstrap.min.js',
  	bower + 'angular-resource/angular-resource.min.js',
  	bower + 'angular-ui-router/release/angular-ui-router.min.js',
  	bower + 'lodash/dist/lodash.min.js'])
    .pipe(concat('library.js'))
    .pipe(gulp.dest('./public/js/'));
}); 
//Start Node Server
gulp.task('startServer',function(){
	 nodemon({ script: 'server.js', ext: 'html js'})
    	.on('change')
   		.on('restart', function () {
      		console.log('restarted!')
    });
})
//sets up default task
gulp.task('default', ['sassyPants','scripts','nightsWatch']);
gulp.task('dev',['default','startServer']);