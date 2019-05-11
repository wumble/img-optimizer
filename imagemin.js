const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');
const del = require('del');
const fs = require('fs');


const readFolders = (dir) => {
  return new Promise((resolve) => {
    const folders = [];
    fs.readdir(dir, (error, files) => {
      files.forEach((item) => {
        if (fs.lstatSync(`${dir}${item}`).isDirectory()) folders.push(`${dir}${item}`);
      });
      resolve(folders);
    });
  });
}

(async () => {
  await del('./dist/**/*');
  const files = [];
  const folders = await readFolders('src/');

  folders.forEach(async (folder) => {
    const distFolder = folder.replace('src/', '');
    const tempFiles = await imagemin([folder], `dist/${distFolder}`, {
      plugins: [
        mozjpeg({progressive: true, quality: 85}),
        pngquant({speed: 6, quality: [0.75, 0.90]}),
        svgo({
          plugins: [
            {removeViewBox: false},
            {removeDimensions: true},
            {removeStyleElement: true}
          ]
        })
      ]
    });

    files.push(tempFiles);
  });
  // console.log(tempFiles);
})();
