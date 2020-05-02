let isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const 
	// Gulp
	gulp 					= require('gulp'), // Подключаем Gulp

	// Gulp plugins		 
	pug 					= require('gulp-pug'), // Подключаем Pug
	plumber 			= require('gulp-plumber'), // Теперь ошибки в Pug не доставляют проблем:)

	sourceMaps 		= require('gulp-sourcemaps'), // На этапе разработки оч полезно понять что откуда взялось

	sass 					= require('gulp-sass'), // Подключаем Sass
	cssToScss 		= require('gulp-css-scss'), // Компилируем для
	autoprefixer 	= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	csso 					= require('gulp-csso'), // Подключаем отличный CSS компрессор

	concat 				= require('gulp-concat'), //конкатенация файлов
	rename 				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов	

	uglify 				= require('gulp-uglify'), // Минимизируем наш common.js 	
	imagemin 			= require('gulp-imagemin'), // Оптимизируем картинки

	gutil 				= require('gulp-util'),			
	
	gulpIf 				= require('gulp-if'),	
	ftp 					= require('vinyl-ftp'),
	del           = require('del'), // Подключаем библиотеку для  удаления файлов и папок
	browserSync		= require('browser-sync'), // Подключаем Browser Sync //
	reload				= browserSync.reload; 				

//-------------------------------------------
// https://habr.com/ru/post/259225/
// Gulp.watch: ловим ошибки правильно
//-------------------------------------------
function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}

//----------------------------------------------
// Наблюдаем за изменениями, компилируем, перезагружаем
//----------------------------------------------
gulp.task('watch', () => {
	gulp.watch('app/pug/**/*.pug',  gulp.parallel('pug'));
	gulp.watch('app/sass/*.sass',  gulp.series('sass'));
	gulp.watch('app/js/*.js',  gulp.parallel('js'));	
});	

//---------------------------------------------
// Browser-Sync
//---------------------------------------------
gulp.task('browser-sync', () => { 
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'dist' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

//--------------------------------------------
// Минимизируем и конкатинируем .js 
//--------------------------------------------
gulp.task('js', () => {
	return gulp.src([
		'app/libs/vue/dist/vue.js',
		'app/js/common.js' // Always at the end
		])		
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));	// Reload
});

//------------------------------------------
// Компилируем SASS в CSS
//------------------------------------------
gulp.task('sass', () => { 	
	return gulp.src('app/sass/**/*.sass')		
		.pipe(gulpIf(isDev, sourceMaps.init()))
		.pipe(sass({
			outputStyle: 'expanded', 
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		.pipe(gulpIf(isDev, sourceMaps.write()))
		.pipe(gulpIf(!isDev, autoprefixer(['last 15 versions']))) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		.pipe(gulpIf(!isDev, csso())) // Минимизируем			
		.pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(gulp.dest('dist/css'))			
		.pipe(browserSync.stream()); // Inject без перезагрузки
});

//-------------------------------------------
// Компилируем Pug в HTML
//-------------------------------------------
gulp.task('pug', () => {
	return gulp.src('app/pug/*.pug')
	.pipe(plumber())
	.pipe(pug({pretty: true})) // Компилируем с индентами
	.pipe(gulp.dest('dist/'))   
	.pipe(reload({stream: true}))	// Reload
});

//----------------------------------------------
// Оптимизация, минификация изображений
//----------------------------------------------
gulp.task('imageMin', () =>
	gulp.src('app/img/**/*')
		.pipe(gulpIf(!isDev, imagemin({
			optimizationLevel: 7,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{
				removeUnknownsAndDefaults: false,
				cleanupIDs: false,
				removeViewBox: false
			}]
		}))
		.pipe(gulp.dest('dist/img'))		
));

//-------------------------------------------
// Копируем шрифты
//-------------------------------------------
gulp.task('copyFont', () => {
	return gulp.src('app/fonts/**/*')		
	.pipe(gulp.dest('dist/fonts'));
});

//----------------------------------------------
// Очистка директории
//----------------------------------------------
gulp.task('removeDist', () => {
	return del('dist/*'); 
});

//-------------------------------------------	
// Скопировать шрифты в директорию dist,
// преобразовать CSS в SCSS
//-------------------------------------------	
gulp.task('beforeTheStart', 
	gulp.series('removeDist', 
		gulp.parallel('copyFont', 'imageMin'),
  	gulp.parallel('pug', 'sass', 'js')
 	)
);

//----------------------------------------------
// По умолчанию (при запуске)
//----------------------------------------------
gulp.task('default', gulp.parallel('beforeTheStart', 'browser-sync', 'watch'));