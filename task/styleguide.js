/**
 * import modules
 */
import {relative, resolve} from 'path';
import gulp from 'gulp';
import buildStyleguide from '@hidoo/gulp-task-build-styleguide-kss';
import copy from '@hidoo/gulp-task-copy';

/**
 * import modules - local
 */
import * as config from '../config';

/**
 * relative path from styleguide to css
 *
 * @type {String}
 */
const pathToCss = relative(config.path.destStyleguide, config.path.destCss);
const pathToCssWebsite = relative(config.path.destWebsite, `${config.path.destWebsite}/css`);

// define build task
export const build = buildStyleguide({
  name: 'styleguide:build',
  src: `${config.path.srcStyleguide}`,
  dest: `${config.path.destStyleguide}`,
  css: [`${pathToCss}/main.css`],
  builder: resolve(__dirname, '../../kss-builder')
});
export const buildWebsite = buildStyleguide({
  name: 'styleguide:build:website',
  src: `${config.path.destWebsite}/css`,
  dest: `${config.path.destWebsite}`,
  css: [`${pathToCssWebsite}/main.css`],
  builder: resolve(__dirname, '../../kss-builder')
});

// define prebuild task
export const prebuild = copy({
  name: 'styleguide:prebuild',
  src: `./*.md`,
  dest: config.path.srcStyleguide
});
export const prebuildWebsite = copy({
  name: 'styleguide:prebuild:website',
  src: `./*.md`,
  dest: `${config.path.destWebsite}/css`
});

// define main task
export const main = gulp.series(
  prebuild,
  build
);

// define website task
export const website = gulp.series(
  prebuildWebsite,
  buildWebsite
);

// define watch task
export const watch = () => {
  gulp.watch(
    [
      `./*.md`,
      `${config.path.srcStyleguide}/*.css`
    ],
    main
  );
};

