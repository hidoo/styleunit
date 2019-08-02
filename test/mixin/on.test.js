/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases} from 'test-util';

describe('@mixin on(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.selectors setting for selectors
   *   @param {String|Null} options.capturingSelectors capturing parent selectors
   * @return {String}
   */
  function wrapper(options = {}) {
    const args = [
      options.selectors || options.selectors === '' ? `$selectors: ${options.selectors}` : false,
      options.capturingSelectors || options.capturingSelectors === '' ? `$capturing-selectors: ${options.capturingSelectors}` : false
    ];

    return `
@import "src/lib/mixin/define-placeholder";
@import "src/lib/mixin/on";

.selector {
  @include on(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should not out if argument $selectors is not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected: ''
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out with specified selectors if argument $selectors is set.', async () => {
    const cases = [
      {
        params: [{selectors: '(":hover")'}],
        expected: '.selector:hover { font-size: 16px; }'
      },
      {
        params: [{selectors: '(":hover", ".is-hover")'}],
        expected: '.selector:hover, .selector.is-hover { font-size: 16px; }'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out capturing settings with specified selectors if argument $capturing-selectors is set and argument $capturing-selectors is true.', async () => {
    const cases = [
      {
        params: [{selectors: '(":hover")', capturingSelectors: '("a", "button")'}],
        expected: '.selector:hover, a:hover .selector, button:hover .selector { font-size: 16px; }'
      },
      {
        params: [{selectors: '(":hover", ".is-hover")', capturingSelectors: '("a", "button")'}],
        expected: '.selector:hover, .selector.is-hover, a:hover .selector, a.is-hover .selector, button:hover .selector, button.is-hover .selector { font-size: 16px; }'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

});
