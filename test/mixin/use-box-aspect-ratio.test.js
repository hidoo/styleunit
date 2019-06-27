/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';

describe('@mixin use-box-aspect-ratio(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.width setting for width
   *   @param {String|Null} options.height setting for height
   * @return {String}
   */
  function wrapper(options = {}) {
    const args = [
      options.width || options.width === '' ? `$width: ${options.width}` : false,
      options.height || options.height === '' ? `$height: ${options.height}` : false
    ];

    return `
@import "src/scss/lib/mixin/use-box-aspect-ratio";

.selector {
  @include use-box-aspect-ratio(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected:
/* eslint-disable indent */
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
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
          width: '4',
          height: '3'
        }],
        expected:
/* eslint-disable indent */
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 75%;
}`
/* eslint-disable indent */
      },
      {
        params: [{
          width: '1',
          height: '1'
        }],
        expected:
/* eslint-disable indent */
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 100%;
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
