/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, normalizeGlobalSettings} from '@hidoo/unit-test-util';

describe('@mixin use-font-family(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.value value of font-size
   *   @param {String|Null} options.important set !important or not
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.value || options.value === '' ? `$value: ${options.value}` : false,
      options.important || options.important === '' ? `$important: ${options.important}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/mixin/use-font-family";

.selector {
  @include use-font-family(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should throw error if argument "$value" is "default" and global variable $unit-font-family is not defined.', async () => {
    const cases = [
      {params: [{value: '"default"'}, {fontFamily: null}]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$value" is "monospace" and global variable $unit-font-family-monospace is not defined.', async () => {
    const cases = [
      {params: [{value: '"monospace"'}, {fontFamilyMonospace: null}]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should not out if global variable $unit-font-enable-override is not true.', async () => {
    const cases = [
      {
        params: [{value: '(serif,)'}, {fontEnableOverride: null}],
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

  it('should out font-family.', async () => {
    const cases = [
      {
        params: [{value: '(serif,)'}],
        expected: '.selector { font-family: serif; }'
      },
      {
        params: [{value: '"default"'}],
        expected: '.selector { font-family: sans-serif; }'
      },
      {
        params: [{value: '"monospace"'}],
        expected: '.selector { font-family: monospace; }'
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

  it('should out font-family with !important if argument $important is true.', async () => {
    const cases = [
      {
        params: [{value: '(serif,)', important: true}],
        expected: '.selector { font-family: serif !important; }'
      },
      {
        params: [{value: '"default"', important: true}],
        expected: '.selector { font-family: sans-serif !important; }'
      },
      {
        params: [{value: '"monospace"', important: true}],
        expected: '.selector { font-family: monospace !important; }'
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
