/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';

describe('@mixin use-table-base(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.width setting for width
   *   @param {String|Null} options.margin setting for margin
   *   @param {String|Null} options.padding setting for padding
   *   @param {String|Null} options.borderStyle setting for border-style
   *   @param {String|Null} options.borderWidth setting for border-width
   * @return {String}
   */
  function wrapper(options = {}) {
    const args = [
      options.width || options.width === '' ? `$width: ${options.width}` : false,
      options.margin || options.margin === '' ? `$margin: ${options.margin}` : false,
      options.padding || options.padding === '' ? `$padding: ${options.padding}` : false,
      options.borderStyle || options.borderStyle === '' ? `$border-style: ${options.borderStyle}` : false,
      options.borderWidth || options.borderWidth === '' ? `$border-width: ${options.borderWidth}` : false
    ];

    return `
@import "src/scss/lib/mixin/use-table-base";

.selector {
  @include use-table-base(${args.filter((arg) => arg !== false).join(', ')});
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
  display: table;
  width: auto;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-style: solid;
  border-width: 1px;
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
          width: '100%',
          margin: '0 auto',
          padding: '10px',
          borderStyle: 'dotted',
          borderWidth: '2px'
        }],
        expected:
/* eslint-disable indent */
`.selector {
  display: table;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-collapse: collapse;
  border-style: dotted;
  border-width: 2px;
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
