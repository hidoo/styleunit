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
  @include mixin.on-focus(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin on-focus(...)', () => {
  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector:where(:hover,:focus,.is-focus){font-size:16px}'
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

  it('should out without specified selectors if settings.$selector-focus is not set.', async () => {
    const cases = [
      {
        params: [[], ['$selector-focus: ""']],
        expected: '.selector:where(:hover,:focus){font-size:16px}'
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
        params: [['$additional-selectors: (".is-hover",)']],
        expected:
          '.selector:where(:hover,:focus,.is-focus,.is-hover){font-size:16px}'
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

  it('should out capturing settings with specified selectors if argument $capturing-selectors is set.', async () => {
    const cases = [
      {
        params: [['$capturing-selectors: ("a", "button")']],
        expected:
          ':where(a,button):where(:hover,:focus,.is-focus) .selector,.selector:where(:hover,:focus,.is-focus){font-size:16px}'
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
