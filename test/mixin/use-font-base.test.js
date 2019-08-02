/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, normalizeGlobalSettings} from 'test-util';

describe('@mixin use-font-base(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.featureSettings enable font-eature-settings or not
   *   @param {String|Null} options.style setting for font-style
   *   @param {String|Null} options.weight setting for font-weight
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.featureSettings || options.featureSettings === '' ? `$feature-settings: ${options.featureSettings}` : false,
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

  it('should not out font-feature-settings if corresponding global variable is not true.', async () => {
    const cases = [
      {
        params: [{}, {fontEnableOverride: null}],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: normal;
  font-weight: normal;
}`
/* eslint-disable indent */
      },
      {
        params: [{}, {fontEnableOverride: 'false'}],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: normal;
  font-weight: normal;
}`
/* eslint-disable indent */
      },
      {
        params: [{}, {fontEnableAdvancedSettings: null}],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: normal;
  font-weight: normal;
}`
/* eslint-disable indent */
      },
      {
        params: [{}, {fontEnableAdvancedSettings: 'false'}],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: normal;
  font-weight: normal;
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

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: normal;
  font-weight: normal;
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

  it('should out properties with font-feature-settings if arguments $feature-settings is true.', async () => {
    const cases = [
      {
        params: [{featureSettings: 'true'}],
        expected:
/* eslint-disable indent */
`.selector {
  font-feature-settings: "palt";
  -ms-font-feature-settings: normal;
  font-style: normal;
  font-weight: normal;
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
          style: 'italic',
          weight: '600'
        }],
        expected:
/* eslint-disable indent */
`.selector {
  font-style: italic;
  font-weight: 600;
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
