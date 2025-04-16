import path from 'node:path';
import { fileURLToPath } from 'node:url';
import gulp from 'gulp';
import buildStyleguide from '@hidoo/gulp-task-build-styleguide-kss';
import * as config from '../config.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// define example tasks
export const unit = buildStyleguide({
  name: 'styleguide:main',
  src: `${config.path.srcStyleguide}/unit`,
  dest: `${config.path.destStyleguide}/unit`,
  get css() {
    return `${path.relative(this.dest, this.src)}/main.css`;
  },
  homepage: path.resolve(dirname, '../README.md')
});
export const pluginSpritesheet = buildStyleguide({
  name: 'styleguide:plugin:spritesheet',
  src: `${config.path.srcStyleguide}/unit-plugin-spritesheet`,
  dest: `${config.path.destStyleguide}/unit-plugin-spritesheet`,
  get css() {
    return `${path.relative(this.dest, this.src)}/main.css`;
  },
  homepage: path.resolve(dirname, '../README.md')
});

// define main task
export const main = gulp.parallel(unit, pluginSpritesheet);

// define watch task
export const watch = () => {
  gulp.watch([`./**/*.md`, `${config.path.srcStyleguide}/**/*.css`], main);
};
