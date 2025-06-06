import gulp from 'gulp';
import buildCss from '@hidoo/gulp-task-build-css-sass';
import * as config from '../config.js';

// define example tasks
export const unit = buildCss({
  name: 'css:main',
  src: `${config.path.srcCss}/main.scss`,
  dest: config.path.destCss,
  filename: 'main.css',
  compress: config.compress
});
export const pluginSpritesheet = buildCss({
  name: 'css:plugin:spritesheet',
  src: `${config.path.srcCss}/plugin/spritesheet/main.scss`,
  dest: `${config.path.destCss}/plugin/spritesheet`,
  filename: 'main.css',
  compress: config.compress
});

// define main task
export const main = gulp.parallel(unit, pluginSpritesheet);

// define watch task
export const watch = () => {
  gulp.watch([`./src/**/*.scss`, `${config.path.srcCss}/**/*.scss`], main);
};
