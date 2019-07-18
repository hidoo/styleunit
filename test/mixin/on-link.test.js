/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';

describe('@mixin on-link(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.additionalSelectors setting for additional-selectors
   *   @param {String|Null} options.capturingSelectors capturing parent selectors
   * @return {String}
   */
  function wrapper(options = {}) {
    const args = [
      options.additionalSelectors || options.additionalSelectors === '' ? `$additional-selectors: ${options.additionalSelectors}` : false,
      options.capturingSelectors || options.capturingSelectors === '' ? `$capturing-selectors: ${options.capturingSelectors}` : false
    ];

    return `
@import "src/lib/function/merge-state-selectors";
@import "src/lib/mixin/define-placeholder";
@import "src/lib/mixin/on";
@import "src/lib/mixin/on-link";

.selector {
  @include on-link(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected: '.selector:link, .selector:visited { font-size: 16px; }'
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

  it('should out with specified selectors if argument $additional-selectors is set.', async () => {
    const cases = [
      {
        params: [{additionalSelectors: '(".is-link")'}],
        expected: '.selector:link, .selector:visited, .selector.is-link { font-size: 16px; }'
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

  it('should out capturing settings with specified selectors if argument $caputuring-selectors is set.', async () => {
    const cases = [
      {
        params: [{capturingSelectors: '("a", "button")'}],
        expected: '.selector:link, .selector:visited, a:link .selector, a:visited .selector, button:link .selector, button:visited .selector { font-size: 16px; }'
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
