/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin use-box-base(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.display setting for display
   *   @param {String|Null} options.overflow setting for overflow
   *   @param {String|Null} options.boxSizing setting for box-sizing
   *   @param {String|Null} options.position setting for position
   *   @param {String|Null} options.listStyle setting for list-style
   *   @param {String|Null} options.margin setting for margin
   *   @param {String|Null} options.padding setting for padding
   *   @param {String|Null} options.border setting for border
   * @return {String}
   */
  function wrapper(options = {}) {
    const args = [
      options.display || options.display === '' ? `$display: ${options.display}` : false,
      options.overflow || options.overflow === '' ? `$overflow: ${options.overflow}` : false,
      options.boxSizing || options.boxSizing === '' ? `$box-sizing: ${options.boxSizing}` : false,
      options.position || options.position === '' ? `$position: ${options.position}` : false,
      options.listStyle || options.listStyle === '' ? `$list-style: ${options.listStyle}` : false,
      options.margin || options.margin === '' ? `$margin: ${options.margin}` : false,
      options.padding || options.padding === '' ? `$padding: ${options.padding}` : false,
      options.border || options.border === '' ? `$border: ${options.border}` : false
    ];

    return `
@import "src/lib/mixin/use-box-base";

.selector {
  @include use-box-base(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected:
/* eslint-disable indent */
`.selector {
  display: block;
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties without display if arguments $display is null.', async () => {
    const cases = [
      {
        params: [{display: 'null'}],
        expected:
/* eslint-disable indent */
`.selector {
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties with overflow if arguments $overflow is valid string.', async () => {
    const cases = [
      {
        params: [{overflow: 'scroll'}],
        expected:
/* eslint-disable indent */
`.selector {
  display: block;
  overflow: scroll;
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties without list-style if arguments $list-style is null.', async () => {
    const cases = [
      {
        params: [{listStyle: 'null'}],
        expected:
/* eslint-disable indent */
`.selector {
  display: block;
  box-sizing: content-box;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties with specified value if arguments is set.', async () => {
    const cases = [
      {
        params: [{
          display: 'inline-block',
          boxSizing: 'border-box',
          position: 'absolute',
          listStyle: 'disc',
          margin: '10px 0',
          padding: '15px',
          border: '1px solid #000'
        }],
        expected:
/* eslint-disable indent */
`.selector {
  display: inline-block;
  box-sizing: border-box;
  position: absolute;
  list-style: disc;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #000;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

});
