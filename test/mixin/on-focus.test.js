/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, normalizeGlobalSettings} from 'test-util';

describe('@mixin on-focus(...)', () => {

  /**
   * wrapper
   *
   * @param {Object} options options
   *   @param {String|null} options.additionalSelectors setting for additional-selectors
   *   @param {String|null} options.capturingSelectors capturing parent selectors
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.additionalSelectors || options.additionalSelectors === '' ? `$additional-selectors: ${options.additionalSelectors}` : false,
      options.capturingSelectors || options.capturingSelectors === '' ? `$capturing-selectors: ${options.capturingSelectors}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/function/merge-state-selectors";
@import "src/lib/mixin/define-placeholder";
@import "src/lib/mixin/on";
@import "src/lib/mixin/on-focus";

.selector {
  @include on-focus(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected: '.selector:hover, .selector:focus, .selector.is-focus { font-size: 16px; }'
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

  it('should out without specified selectors if global variable $unit-state-selectors-focus is not defined.', async () => {
    const cases = [
      {
        params: [{}, {stateSelectorsFocus: null}],
        expected: '.selector:hover, .selector:focus { font-size: 16px; }'
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
        params: [{additionalSelectors: '(".is-hover")'}],
        expected: '.selector:hover, .selector:focus, .selector.is-focus, .selector.is-hover { font-size: 16px; }'
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

  it('should out capturing settings with specified selectors if argument $capturing-selectors is set.', async () => {
    const cases = [
      {
        params: [{capturingSelectors: '("a", "button")'}],
        expected: '.selector:hover, .selector:focus, .selector.is-focus, a:hover .selector, a:focus .selector, a.is-focus .selector, button:hover .selector, button:focus .selector, button.is-focus .selector { font-size: 16px; }'
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
