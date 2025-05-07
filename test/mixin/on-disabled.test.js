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
  @include mixin.on-disabled(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin on-disabled(...)', () => {
  it('should out with default selectors if argument is not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector:where(:disabled,.is-disabled){font-size:16px}'
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

  it('should out pseudo selector only if argument is not set and settings.$selector-disabled is not set.', async () => {
    const cases = [
      {
        params: [[], ['$selector-disabled: ""']],
        expected: '.selector:where(:disabled){font-size:16px}'
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
          '.selector:where(:disabled,.is-disabled,.is-not-use){font-size:16px}'
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
        params: [['$capturing-selectors: ("button",)']],
        expected:
          ':where(button):where(:disabled,.is-disabled) .selector,.selector:where(:disabled,.is-disabled){font-size:16px}'
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
