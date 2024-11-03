const { parallel } = require('gulp');
const { src, dest } = require('gulp');

function copyAssets(cb) {
  // body omitted
  cb();
  return src('src/assets/**/*')
    .pipe(dest('dist/assets'));
}

function copyImages(cb) {
  // body omitted
  cb();
  const iDest = 'dist/images/';

  return src(['images/*', '!images/README.md'], { encoding: false })
    .pipe(dest(iDest))
    .pipe(require('gulp-filelist')('manifest.json', { flatten: true }))
    .pipe(dest(iDest));
}

exports.images = copyImages
exports.default = parallel(copyAssets, copyImages);

