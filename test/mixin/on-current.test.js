/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';
import normalizeGlobalSettings from '../fixture/normalizeGlobalSettings';

describe('@mixin on-current(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.additionalSelectors setting for additional-selectors
   *   @param {String|Null} options.capturingSelectors capturing parent selectors
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
@import "src/scss/lib/function/merge-state-selectors";
@import "src/scss/lib/mixin/define-inline-placeholder";
@import "src/scss/lib/mixin/on";
@import "src/scss/lib/mixin/on-current";

.selector {
  @include on-current(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
    `;
  }

  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected: '.selector.is-current { font-size: 16px; }'
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

  it('should not out if global variable $unit-state-selectors-current is not defined.', async () => {
    const cases = [
      {
        params: [{}, {stateSelectorsCurrent: null}],
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

  it('should out with specified selectors if argument $additional-selectors is set.', async () => {
    const cases = [
      {
        params: [{additionalSelectors: '(".is-hover")'}],
        expected: '.selector.is-current, .selector.is-hover { font-size: 16px; }'
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
        expected: '.selector.is-current, a.is-current .selector, button.is-current .selector { font-size: 16px; }'
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
