import path from 'node:path';
import { fileURLToPath } from 'node:url';
import gulp from 'gulp';
import buildStyleguide from '@hidoo/gulp-task-build-styleguide-kss';
import * as config from '../config.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const options = {
  builder: path.resolve(dirname, '../node_modules/@hidoo/kss-builder'),
  'pseudo-class-transforms': false,
  'section-duplicates': false
};

// define example tasks
export const unit = buildStyleguide({
  ...options,
  name: 'styleguide:main',
  src: `${config.path.srcStyleguide}/main.css`,
  dest: config.path.destStyleguide,
  get css() {
    return `${path.relative(this.dest, path.dirname(this.src))}/main.css`;
  },
  homepage: path.resolve(dirname, '../README.md')
});
export const pluginSpritesheet = buildStyleguide({
  ...options,
  name: 'styleguide:plugin:spritesheet',
  src: `${config.path.srcStyleguide}/plugin/spritesheet/main.css`,
  dest: `${config.path.destStyleguide}/plugin/spritesheet`,
  get css() {
    return `${path.relative(this.dest, path.dirname(this.src))}/main.css`;
  },
  homepage: path.resolve(dirname, '../src/plugin/spritesheet/README.md')
});

// define main task
export const main = gulp.parallel(unit, pluginSpritesheet);

// define watch task
export const watch = () => {
  gulp.watch([`./**/*.md`, `${config.path.srcStyleguide}/**/*.css`], main);
};
