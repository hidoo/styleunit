/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin use-table-base(...)', () => {

  /**
   * wrapper
   *
   * @param {Object} options options
   *   @param {String|null} options.width setting for width
   *   @param {String|null} options.margin setting for margin
   *   @param {String|null} options.padding setting for padding
   *   @param {String|null} options.borderStyle setting for border-style
   *   @param {String|null} options.borderWidth setting for border-width
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
@import "src/lib/mixin/use-table-base";

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
`.selector {
  display: table;
  width: auto;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-style: solid;
  border-width: 1px;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
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
`.selector {
  display: table;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-collapse: collapse;
  border-style: dotted;
  border-width: 2px;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

});
