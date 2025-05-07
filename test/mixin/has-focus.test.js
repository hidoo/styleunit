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
  @include mixin.has-focus(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin has-focus(...)', () => {
  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector:has(:hover,:focus,.is-focus){font-size:16px}'
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

  it('should out pseudo selector only if argument is not set and settings.$selector-focus is not set.', async () => {
    const cases = [
      {
        params: [[], ['$selector-focus: ""']],
        expected: '.selector:has(:hover,:focus){font-size:16px}'
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

  it('should out with specified selectors if argument $additional-selectors is set.', async () => {
    const cases = [
      {
        params: [['$additional-selectors: (".is-not-use",)']],
        expected:
          '.selector:has(:hover,:focus,.is-focus,.is-not-use){font-size:16px}'
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
        params: [['$options: ("not": true)']],
        expected: '.selector:has(:not(:hover,:focus,.is-focus)){font-size:16px}'
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
