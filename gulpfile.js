"use strict";

const {src, dest, series, watch, parallel} = require('gulp'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('autoprefixer-stylus'),
	jeet = require('jeet'),
	gulpIf = require('gulp-if'),
	minify = require("gulp-babel-minify"),
	//nib = require('nib'),
	gcmq = require('gulp-group-css-media-queries'),
	cssmin = require('gulp-cssmin'),
	rename = require("gulp-rename"),
	pug = require('gulp-pug'),
	fs = require('fs'),
	decomment = require('gulp-decomment'),
	babel = require('gulp-babel'),
	browsersync = require("browser-sync").create(),
	useref = require('gulp-useref'),
	concat = require('gulp-concat'),
	merge = require('gulp-merge-json'),
	path = require('path');

const configuracion = JSON.parse(fs.readFileSync("config.json", "utf8"));

function jsonPug(){
	return src('./src/json/pug/**/*.json')
		.pipe(merge({
			fileName: 'data.json',
			edit: (json, file) => {
				// Extract the filename and strip the extension
				var filename = path.basename(file.path),
					primaryKey = filename.replace(path.extname(filename), '');
				
				// Set the filename as the primary key for our JSON data
				var data = {};
				data[primaryKey.toUpperCase()] = json;
				
				return data;
			}
		}))
		.pipe(dest('./src/json/temp'))
}

function htmlDesarrollo(done){
	let configuracionPug = {
		doctype: 'html',
		pretty: true,
		locals: {
			data: JSON.parse(fs.readFileSync('./src/json/temp/data.json', 'utf8'))
		}
	}
	
	if(typeof done !== "function"){
		let variable = done,
			//variableRota = done.split("/"),
			variableRota = done.split("\\"),
			variableFinal = [],
			folder;
		
		for(let i = 2; i < variableRota.length -1; i++) {
			variableFinal = variableRota[i];
		}
		
		folder = `dist/dev/${variableFinal}`
		
		if(variable.indexOf("_") === -1){
			return src(variable, { base: "src/html/" })
				.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
				// .pipe(dest(folder))
				.pipe(dest(configuracion.directorios.pug.destino.dev))
				.pipe(browsersync.stream());
		}else{
			return src(configuracion.directorios.pug.fuente)
				.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
				.pipe(dest(configuracion.directorios.pug.destino.dev))
				.pipe(browsersync.stream());
		}
	}else{
		return src(configuracion.directorios.pug.fuente)
			.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
			.pipe(dest(configuracion.directorios.pug.destino.dev))
			.pipe(browsersync.stream());
	}
}

function htmlProduccion(done){
	let configuracionPug = {
		doctype: 'html',
		pretty: true,
		locals: {
			data: JSON.parse(fs.readFileSync('./src/json/temp/data.json', 'utf8'))
		}
	}
	
	if(typeof done !== "function"){
		let variable = done,
			variableRota = done.split("\\"),
			variableFinal = [],
			folder;
		
		for(let i = 2; i < variableRota.length -1; i++) {
			variableFinal = variableRota[i];
		}
		
		folder = `dist/prod/${variableFinal}`
		
		if(variable.indexOf("_") === -1){
			return src(variable, { base: "src/html/" })
				.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
				// .pipe(dest(folder))
				.pipe(dest(configuracion.directorios.pug.destino.prod))
				.pipe(browsersync.stream());
		}else{
			return src(configuracion.directorios.pug.fuente)
				.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
				.pipe(dest(configuracion.directorios.pug.destino.prod))
				.pipe(browsersync.stream());
		}
	}else{
		return src(configuracion.directorios.pug.fuente)
			.pipe(pug(configuracionPug).on('error', error => {console.log('Error en pug: ' + error);}))
			.pipe(dest(configuracion.directorios.pug.destino.prod))
			.pipe(browsersync.stream());
	}
}

function cssDesarrollo(){
	return src(configuracion.directorios.stylus.fuente)
		.pipe(stylus({
			use: [
				autoprefixer(),
				jeet()]
		}))
		.pipe(dest(configuracion.directorios.stylus.destino.dev))
		.pipe(browsersync.stream());
}

function cssProduccion(){
	return src("./src/css/*.styl")
		.pipe(stylus({use: [autoprefixer(), jeet()]}))
		.pipe(gcmq())
		.pipe(cssmin())
		.pipe(rename({suffix: ".min"}))
		.pipe(dest(configuracion.directorios.stylus.destino.prod))
		.pipe(browsersync.stream());
}

function jsProduccionHTML(){
	return src('dist/prod/**/*.html')
		.pipe(useref())
		.pipe(dest('dist/prod'))
		.pipe(browsersync.stream());
}

function jsDesarrollo(){
	return src('./src/js/**/*.js')
		.pipe(babel({presets: ['@babel/preset-env']}))
		.on('error', function(error){console.log(error.toString())})
		.pipe(dest('./dist/dev/js'))
		.pipe(browsersync.stream());
}

function jsProduccion(){
	return src(configuracion.directorios.js.produccion)
		.pipe(concat('main.min.js'))
		.pipe(decomment({trim: true}))
		.pipe(babel({presets: ['@babel/preset-env']}))
		.pipe(minify({
			builtIns: false,
			evaluate: false,
			mangle: {
				keepClassName: true
			}
		}))
		
		.pipe(dest(configuracion.directorios.js.destino.prod))
		.pipe(browsersync.stream());
}

function imagenesDesarrollo(){
	return src(configuracion.directorios.imagenes.fuente)
		.pipe(dest(configuracion.directorios.imagenes.destino.dev))
}

function imagenesProduccion(){
	return src(configuracion.directorios.imagenes.fuente)
		.pipe(dest(configuracion.directorios.imagenes.destino.prod))
}

function fontsDesarrollo(){
	return src(configuracion.directorios.fonts.fuente)
		.pipe(dest(configuracion.directorios.fonts.destino.dev))
}

function fontsProduccion(){
	return src(configuracion.directorios.fonts.fuente)
		.pipe(dest(configuracion.directorios.fonts.destino.prod))
}

function backgroundsDesarrollo(){
	return src(configuracion.directorios.backgrounds.fuente)
		.pipe(dest(configuracion.directorios.backgrounds.destino.dev))
}

function backgroundsProduccion(){
	return src(configuracion.directorios.backgrounds.fuente)
		.pipe(dest(configuracion.directorios.backgrounds.destino.prod))
}

function videoDesarrollo(){
	return src(configuracion.directorios.video.fuente)
		.pipe(dest(configuracion.directorios.video.destino.dev))
}

function videoProduccion(){
	return src(configuracion.directorios.video.fuente)
		.pipe(dest(configuracion.directorios.video.destino.prod))
}

function assetsDesarrollo(){
	return src(configuracion.directorios.assets.fuente)
		.pipe(dest(configuracion.directorios.assets.destino.dev))
}

function assetsProduccion(){
	return src(configuracion.directorios.assets.fuente)
		.pipe(dest(configuracion.directorios.assets.destino.prod))
}

function jsonDesarrollo(){
	return src([configuracion.directorios.datos.fuente, '!./src/json/pug/**/*.json'])
		.pipe(dest(configuracion.directorios.datos.destino.dev))
}

function jsonProduccion(){
	return src([configuracion.directorios.datos.fuente, '!./src/json/pug/**/*.json'])
		.pipe(dest(configuracion.directorios.datos.destino.prod))
}

function browserSyncDesarrollo(done){
	browsersync.init({
		server: {
			baseDir: "dist/dev",
			serveStaticOptions: {
				extensions: ['html']
			},
			directory: true
		},
		port: 3000
	});
	
	let watcherHtml = watch(configuracion.directorios.pug.watcher);
	
	watch(configuracion.directorios.stylus.watcher,                     cssDesarrollo);
	watch("./src/js/**/*.js",                                           jsDesarrollo);
	watch(configuracion.directorios.imagenes.fuente,                    imagenesDesarrollo);
	watch([configuracion.directorios.datos.fuente, '!./src/json/pug'],  jsonDesarrollo);
	watch('./src/json/pug',                                             jsonPug);
	watch(configuracion.directorios.fonts.fuente,                       fontsDesarrollo);
	watch(configuracion.directorios.backgrounds.fuente,                 backgroundsDesarrollo);
	watch(configuracion.directorios.video.fuente,                       videoDesarrollo);
	watch(configuracion.directorios.assets.fuente,                      assetsDesarrollo);
	watcherHtml.on('change', function(path){htmlDesarrollo(path)});
	
	watch("./dis/dev/js/**/*.js").on('change', browsersync.reload);
	watch(configuracion.directorios.pug.recargar.dev).on('change', browsersync.reload);
	
	done();
}

function browserSyncProduccion(done){
	browsersync.init({
		server: {
			baseDir: "dist/prod",
			serveStaticOptions: {
				extensions: ['html']
			},
			directory: true
		},
		port: 3000
	});
	
	let watcherHtml = watch(configuracion.directorios.pug.watcher);
	
	watch(configuracion.directorios.stylus.watcher,                     cssProduccion);
	watch("./src/js/**/*.js",                                           jsProduccion);
	watch(configuracion.directorios.imagenes.fuente,                    imagenesProduccion);
	watch(configuracion.directorios.fonts.fuente,                       fontsProduccion);
	watch(configuracion.directorios.video.fuente,                       videoProduccion);
	watch([configuracion.directorios.datos.fuente, '!./src/json/pug'],  jsonProduccion);
	watch('./src/json/pug',                                             jsonPug);
	watch(configuracion.directorios.assets.fuente,                      assetsProduccion);
	watcherHtml.on('change', function(path){htmlProduccion(path)});
	
	watch("./dis/prod/js/**/*.js").on('change', browsersync.reload);
	watch(configuracion.directorios.pug.recargar.prod).on('change', browsersync.reload);
	
	done();
}

function browserSyncIngenia(done){
	browsersync.init({
		server: {
			baseDir: "dist/dev",
			serveStaticOptions: {
				extensions: ['html']
			},
			directory: true
		},
		port: 3000
	});
	
	let watcherHtml = watch(configuracion.directorios.pug.watcher);
	
	watch(configuracion.directorios.stylus.watcher,                     parallel(cssProduccion, cssDesarrollo));
	watch("./src/js/**/*.js",                                           parallel(jsDesarrollo, jsProduccion));
	watch(configuracion.directorios.imagenes.fuente,                    parallel(imagenesProduccion, imagenesDesarrollo));
	watch(configuracion.directorios.fonts.fuente,                       parallel(fontsProduccion, fontsDesarrollo));
	watch(configuracion.directorios.backgrounds.fuente,					parallel(backgroundsProduccion, backgroundsDesarrollo));
	watch(configuracion.directorios.video.fuente,                       parallel(videoProduccion, videoDesarrollo));
	watch(configuracion.directorios.assets.fuente,                      parallel(assetsProduccion, assetsDesarrollo));
	watch([configuracion.directorios.datos.fuente, '!./src/json/pug'],  parallel(jsonProduccion, jsonDesarrollo));
	watch('./src/json/pug',                                             jsonPug);
	watcherHtml.on('change', function(path){htmlProduccion(path); htmlDesarrollo(path)});
	
	watch(configuracion.directorios.js.recargar.dev).on('change', browsersync.reload);
	watch(configuracion.directorios.pug.recargar.dev).on('change', browsersync.reload);
	
	done();
}

exports.htmlDesarrollo      = htmlDesarrollo;
exports.htmlProduccion      = htmlProduccion;
exports.cssDesarrollo       = cssDesarrollo;
exports.cssProduccion       = cssProduccion;
exports.jsDesarrollo        = jsDesarrollo;
exports.jsProduccion        = jsProduccion;
exports.jsProduccionHTML    = jsProduccionHTML;
exports.imagenesDesarrollo  = imagenesDesarrollo;
exports.imagenesProduccion  = imagenesProduccion;
exports.fontsDesarrollo     = fontsDesarrollo;
exports.fontsProduccion     = fontsProduccion;
exports.backgroundsDesarrollo     	= backgroundsDesarrollo;
exports.backgroundsProduccion     	= backgroundsProduccion;
exports.videoDesarrollo     = videoDesarrollo;
exports.videoProduccion     = videoProduccion;
exports.assetsDesarrollo    = assetsDesarrollo;
exports.assetsProduccion    = assetsProduccion;
exports.jsonDesarrollo      = jsonDesarrollo;
exports.jsonProduccion      = jsonProduccion;
exports.jsonPug             = jsonPug;

const compilarDesarrollo    = series(jsonPug, parallel(cssDesarrollo, jsDesarrollo, htmlDesarrollo, imagenesDesarrollo, fontsDesarrollo, backgroundsDesarrollo, videoDesarrollo, jsonDesarrollo, assetsDesarrollo), browserSyncDesarrollo);
const compilarProduccion    = series(jsonPug, parallel(cssProduccion, jsProduccion, htmlProduccion, imagenesProduccion, fontsProduccion, backgroundsProduccion, videoProduccion, jsonProduccion, assetsProduccion), browserSyncProduccion);
const compilarIngenia       = series(jsonPug, parallel(cssDesarrollo, jsDesarrollo, htmlDesarrollo, imagenesDesarrollo, fontsDesarrollo, backgroundsDesarrollo, cssProduccion, jsProduccion, htmlProduccion, imagenesProduccion, fontsProduccion, backgroundsProduccion, jsonDesarrollo, jsonProduccion, assetsDesarrollo, assetsProduccion), browserSyncIngenia);

exports.default             = compilarDesarrollo;
exports.produccion          = compilarProduccion;
exports.ingenia             = compilarIngenia;
