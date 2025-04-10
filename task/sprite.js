import path from 'node:path';
import gulp from 'gulp';
import buildImageSprite from '@hidoo/gulp-task-build-sprite-image';
import buildSvgSprite from '@hidoo/gulp-task-build-sprite-svg';
import * as config from '../config.js';

/**
 * url parameter for browser cache
 *
 * @type {String}
 */
const cacheParameter =
  process.env.NODE_ENV === 'development'
    ? ''
    : `?version=${config.pkg.version}`;

/**
 * relative path from css to sprite
 *
 * @type {String}
 */
const pathToSprite = path.relative(
  `${config.path.destCss}/unit-plugin-spritesheet`,
  config.path.destSprite
);

/**
 * return merged build options
 *
 * @param {Object} options build task options
 * @return {Object}
 */
function buildOptions(options = {}) {
  return {
    ...options,
    destImg: config.path.destSprite,
    destCss: `${config.path.srcCss}/unit-plugin-spritesheet/sprite`,
    imgPath: `${pathToSprite}/${options.imgName}${cacheParameter}`,
    cssPreprocessor: 'sass:module',
    compress: config.compress
  };
}

const iconImage = buildImageSprite(
  buildOptions({
    name: 'sprite:icon:image',
    src: `${config.path.srcSprite}/icon-assets/*.png`,
    imgName: 'icon-image.png',
    cssName: '_icon-image.scss',
    evenize: true
  })
);

const iconSvg = buildSvgSprite(
  buildOptions({
    name: 'sprite:icon:svg',
    src: `${config.path.srcSprite}/icon-assets/*.svg`,
    imgName: 'icon-svg.svg',
    cssName: '_icon-svg.scss'
  })
);

const textImage = buildImageSprite(
  buildOptions({
    name: 'sprite:text:image',
    src: `${config.path.srcSprite}/text-assets/*.png`,
    imgName: 'text-image.png',
    cssName: '_text-image.scss',
    evenize: true
  })
);

const textSvg = buildSvgSprite(
  buildOptions({
    name: 'sprite:text:svg',
    src: `${config.path.srcSprite}/text-assets/*.svg`,
    imgName: 'text-svg.svg',
    cssName: '_text-svg.scss'
  })
);

const radioImage = buildImageSprite(
  buildOptions({
    name: 'sprite:radio:image',
    src: `${config.path.srcSprite}/radio-assets/*.png`,
    imgName: 'radio-image.png',
    cssName: '_radio-image.scss',
    evenize: true
  })
);

const radioSvg = buildSvgSprite(
  buildOptions({
    name: 'sprite:radio:svg',
    src: `${config.path.srcSprite}/radio-assets/*.svg`,
    imgName: 'radio-svg.svg',
    cssName: '_radio-svg.scss'
  })
);

const checkImage = buildImageSprite(
  buildOptions({
    name: 'sprite:check:image',
    src: `${config.path.srcSprite}/check-assets/*.png`,
    imgName: 'check-image.png',
    cssName: '_check-image.scss',
    evenize: true
  })
);

const checkSvg = buildSvgSprite(
  buildOptions({
    name: 'sprite:check:svg',
    src: `${config.path.srcSprite}/check-assets/*.svg`,
    imgName: 'check-svg.svg',
    cssName: '_check-svg.scss'
  })
);

// define main task
export const main = gulp.parallel(
  iconImage,
  iconSvg,
  textImage,
  textSvg,
  radioImage,
  radioSvg,
  checkImage,
  checkSvg
);

// define watch task
export const watch = () => {
  gulp.watch([`${config.path.srcSprite}/icon-assets/*.svg`], iconSvg);
  gulp.watch([`${config.path.srcSprite}/icon-assets/*.png`], iconImage);
  gulp.watch([`${config.path.srcSprite}/text-assets/*.png`], textImage);
  gulp.watch([`${config.path.srcSprite}/text-assets/*.svg`], textSvg);
  gulp.watch([`${config.path.srcSprite}/radio-assets/*.png`], radioImage);
  gulp.watch([`${config.path.srcSprite}/radio-assets/*.svg`], radioSvg);
  gulp.watch([`${config.path.srcSprite}/check-assets/*.png`], checkImage);
  gulp.watch([`${config.path.srcSprite}/check-assets/*.svg`], checkSvg);
};
