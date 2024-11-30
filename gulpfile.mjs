// Импорты модулей
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import replace from 'gulp-replace';
import gulpFilter from 'gulp-filter';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';






// Инициализация BrowserSync
const browserSyncInstance = browserSync.create();
const sass = gulpSass(dartSass);

// Пути к файлам
const paths = {
	scripts: {
		src: 'src/js/**/*.js',
		dest: 'dist/js/',
	},
	fonts: {
		src: 'src/assets/fonts/**/*.{ttf,woff,woff2}',
		dest: 'dist/assets/fonts'
	},
	html: {
		src: 'src/pages/**/*.html',
		partials: 'src/partials/',
		dest: 'dist/'
	},
	assets: {
		src: 'src/assets/**/*',
		dest: 'dist/assets'
	},
	scss: 'src/scss/**/*.scss',
	css: 'dist/css'
};


function scripts() {
	return gulp
		.src(paths.scripts.src) // Берем все файлы из src/js/
		.pipe(sourcemaps.init()) // Инициализируем sourcemaps
		.pipe(uglify())          // Минифицируем файлы
		// .pipe(concat('main.bundle.js')) // Объединяем в один файл
		.pipe(sourcemaps.write('.')) // Записываем sourcemaps
		.pipe(gulp.dest(paths.scripts.dest)); // Сохраняем в dist/js/
}

// Компиляция SCSS в CSS
export function styles() {
	return gulp.src(paths.scss)
		.pipe(sass().on('error', sass.logError)) // Используем исправленный sass
		.pipe(gulp.dest(paths.css))
		.pipe(browserSyncInstance.stream());
}

// Компиляция HTML с инклюдами
export function html() {
	return gulp.src(paths.html.src)
		.pipe(fileInclude({
			prefix: '@@',
			basepath: paths.html.partials
		}))
		.pipe(gulp.dest(paths.html.dest))
		.on('end', replaceHtml)
		.pipe(browserSyncInstance.stream());
}

// Копирование шрифтов
export function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}

// Копирование статических файлов
export async function assets() {
	// Создаём фильтр для исключения изображений
	const excludeImages = gulpFilter(['**/**/*', '!**/*.{jpg,jpeg,png}'], { restore: true });

	return await gulp.src(paths.assets.src)
		.pipe(excludeImages) // Исключаем изображения
		.pipe(gulp.dest(paths.assets.dest))
		.pipe(browserSyncInstance.stream());
}

// Конвертирование JPG и PNG в WebP
export async function convertWebp() {
	return await gulp.src('src/assets/**/*.{jpg,jpeg,png}', { encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('dist/assets'))


}
// Замена ссылок на изображения в HTML
export async function replaceHtml() {
	return gulp.src('dist/**/*.html') // Путь к HTML в папке dist
		.pipe(replace(/\.(png|jpg|jpeg)(\?[^"]*)?/g, '.webp$2')) // Заменяем расширения
		.pipe(gulp.dest('dist')) // Сохраняем изменения

}

// Сжатие CSS
export function minifyCSS() {
	return gulp.src('dist/css/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.css));
}

// Локальный сервер и слежение за изменениями
export function serve() {
	browserSyncInstance.init({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch(paths.scripts.src, scripts); // Следим за JavaScript
	gulp.watch(paths.scss, styles); // Следим за SCSS
	// gulp.watch(paths.html.src, html); // Следим за HTML
	gulp.watch([paths.html.src, `${paths.html.partials}/**/*.html`], gulp.series(html));
	gulp.watch(paths.assets.src, assets); // Следим за статическими файлами
	gulp.watch(paths.fonts.src, fonts); // Следим за шрифтами
}


// Основная задача сборки
export const build = gulp.series(
	gulp.series(html, styles, fonts, assets, convertWebp, replaceHtml, scripts),
	minifyCSS
);

// Задача по умолчанию (сборка + сервер)
export default gulp.series(build, serve);
