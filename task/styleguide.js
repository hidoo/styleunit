/**
 * import modules
 */
import {relative, resolve} from 'path';
import gulp from 'gulp';
import buildStyleguide from '@hidoo/gulp-task-build-styleguide-kss';

/**
 * import modules - local
 */
import * as config from '../config';

/**
 * relative path from styleguide to css
 *
 * @type {String}
 */
const pathToCssWebsite = relative(config.path.destWebsite, `${config.path.destWebsite}/css`);

// define example tasks
export const unit = buildStyleguide({
  name: 'styleguide:main',
  src: `${config.path.srcStyleguide}/unit`,
  dest: `${config.path.destStyleguide}/unit`,
  get css() { return `${relative(this.dest, this.src)}/main.css`; },
  homepage: resolve(__dirname, '../README.md'),
  builder: resolve(__dirname, '../../kss-builder')
});
export const pluginSpritesheet = buildStyleguide({
  name: 'styleguide:plugin:spritesheet',
  src: `${config.path.srcStyleguide}/unit-plugin-spritesheet`,
  dest: `${config.path.destStyleguide}/unit-plugin-spritesheet`,
  get css() { return `${relative(this.dest, this.src)}/main.css`; },
  homepage: resolve(__dirname, '../README.md'),
  builder: resolve(__dirname, '../../kss-builder')
});

// define main task
export const main = gulp.parallel(
  unit,
  pluginSpritesheet
);

// define website task
export const website = buildStyleguide({
  name: 'styleguide:main:website',
  src: `${config.path.destWebsite}/css`,
  dest: `${config.path.destWebsite}`,
  css: [`${pathToCssWebsite}/main.css`],
  homepage: resolve(__dirname, '../README.md'),
  builder: resolve(__dirname, '../../kss-builder')
});

// define watch task
export const watch = () => {
  gulp.watch(
    [
      `./**/*.md`,
      `${config.path.srcStyleguide}/**/*.css`
    ],
    main
  );
};

