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
  @include mixin.on-current(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin on-current(...)', () => {
  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector:where(.is-current){font-size:16px}'
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

  it('should not out if settings.$selector-current is not set.', async () => {
    const cases = [
      {
        params: [[], ['$selector-current: ""']],
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

  it('should out with specified selectors if argument $additional-selectors is set.', async () => {
    const cases = [
      {
        params: [['$additional-selectors: (".is-now",)']],
        expected: '.selector:where(.is-current,.is-now){font-size:16px}'
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
          ':where(a,button):where(.is-current) .selector,.selector:where(.is-current){font-size:16px}'
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
