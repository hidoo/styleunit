/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../util/index.js';

/**
 * wrapper
 *
 * @param {Array} args arguments
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (args = [], settings = []) => `
${useSettingsWith(settings)}
@use "src/lib/mixin";

.selector {
  @include mixin.has(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin has($selectors..., $options)', () => {
  it('should throw error if argument $selectors is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: ''
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert.equal(actual, expected);
        return resolve();
      }
    );
  });

  it('should out with specified selectors if argument $selectors is set.', async () => {
    const cases = [
      {
        params: [['$selectors: (":hover",), $options: ()']],
        expected: '.selector:has(:hover){font-size:16px}'
      },
      {
        params: [['$selectors: (":hover", ".is-hover"), $options: ()']],
        expected: '.selector:has(:hover,.is-hover){font-size:16px}'
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert.equal(actual, expected);
        return resolve();
      }
    );
  });

  it('should out specified selectors with :not() selector if argument $options.not is true.', async () => {
    const cases = [
      {
        params: [
          ['$selectors: (":hover", ".is-hover"), $options: ("not": true)']
        ],
        expected: '.selector:has(:not(:hover,.is-hover)){font-size:16px}'
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert.equal(actual, expected);
        return resolve();
      }
    );
  });
});
