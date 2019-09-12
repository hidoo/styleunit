/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, normalizeGlobalSettings} from 'test-util';

describe('@mixin use-font-base(...)', () => {

  /**
   * wrapper
   *
   * @param {Object} options options
   *   @param {String|null} options.style setting for font-style
   *   @param {String|null} options.weight setting for font-weight
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.style || options.style === '' ? `$style: ${options.style}` : false,
      options.weight || options.weight === '' ? `$weight: ${options.weight}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/mixin/use-font-base";

.selector {
  @include use-font-base(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected:
`.selector {
  font-style: normal;
  font-weight: normal;
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
          style: 'italic',
          weight: '600'
        }],
        expected:
`.selector {
  font-style: italic;
  font-weight: 600;
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
