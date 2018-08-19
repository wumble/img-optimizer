const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');
const del = require('del');
 

(async () => {
	await del('./dist/**/*');
	
	const files = await imagemin(['src/**/*.{JPG,jpg,PNG,png,SVG,svg}'], 'dist/', {
		plugins: [
			mozjpeg({progressive: true, quality: 85}),
			pngquant({speed: 6, quality: 80}),
			svgo({
				plugins: [
					{removeViewBox: false},
					{removeDimensions: true},
					{removeStyleElement: true}
				]
			})
		]
	});
	console.log(files);
})();