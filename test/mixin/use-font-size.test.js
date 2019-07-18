/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';
import normalizeGlobalSettings from '../fixture/normalizeGlobalSettings';

describe('@mixin use-font-size(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.value value of font-size
   *   @param {String|Null} options.monospace font-family is monospace or not
   *   @param {String|Null} options.important set !important or not
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.value || options.value === '' ? `$value: ${options.value}` : false,
      options.monospace || options.monospace === '' ? `$monospace: ${options.monospace}` : false,
      options.important || options.important === '' ? `$important: ${options.important}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/function/px-to-rem";
@import "src/lib/mixin/use-font-size";

.selector {
  @include use-font-size(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should throw error if argument "$value" is not valid.', async () => {
    const cases = [
      {params: [{value: 'null'}]},
      {params: [{value: 'false'}]},
      {params: [{value: '"normal"'}]},
      {params: [{value: '#000'}]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$value" is keyword and global variable $unit-font-size is not defined.', async () => {
    const cases = [
      {params: [{value: 'medium'}, {fontSize: null}]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out font-size.', async () => {
    const cases = [
      {
        params: [{value: '0'}],
        expected: '.selector { font-size: 0; }'
      },
      {
        params: [{value: '14px'}],
        expected: '.selector { font-size: 14px; font-size: 0.875rem; }'
      },
      {
        params: [{value: 'medium'}],
        expected: '.selector { font-size: 14px; font-size: 0.875rem; }'
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

  it('should out font-size without rem if global variable $unit-font-enable-relative-size is not true.', async () => {
    const cases = [
      {
        params: [{value: '0'}, {fontEnableRelativeSize: null}],
        expected: '.selector { font-size: 0; }'
      },
      {
        params: [{value: '14px'}, {fontEnableRelativeSize: null}],
        expected: '.selector { font-size: 14px; }'
      },
      {
        params: [{value: 'medium'}, {fontEnableRelativeSize: null}],
        expected: '.selector { font-size: 14px; }'
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

  it('should out font-size smaller than specfied size if argument $monospace is true.', async () => {
    const cases = [
      {
        params: [{value: '0', monospace: 'true'}],
        expected: '.selector { font-size: 0; }'
      },
      {
        params: [{value: '14px', monospace: 'true'}],
        expected: '.selector { font-size: 12px; font-size: 0.75rem; }'
      },
      {
        params: [{value: 'medium', monospace: 'true'}],
        expected: '.selector { font-size: 12px; font-size: 0.75rem; }'
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

  it('should out font-size with !important if argument $important is true.', async () => {
    const cases = [
      {
        params: [{value: '0', important: 'true'}],
        expected: '.selector { font-size: 0 !important; }'
      },
      {
        params: [{value: '14px', important: 'true'}],
        expected: '.selector { font-size: 14px !important; font-size: 0.875rem !important; }'
      },
      {
        params: [{value: 'medium', important: 'true'}],
        expected: '.selector { font-size: 14px !important; font-size: 0.875rem !important; }'
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
