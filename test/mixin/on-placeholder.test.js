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
  @include mixin.on-placeholder(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin on-placeholder(...)', () => {
  it('should out placeholder selectors.', async () => {
    const cases = [
      {
        params: [[]],
        expected: [
          '.selector::-webkit-input-placeholder{font-size:16px}',
          '.selector::-moz-placeholder{font-size:16px}',
          '.selector:-ms-input-placeholder{font-size:16px}',
          '.selector:placeholder-shown{font-size:16px}'
        ].join('')
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

        assert(actual === expected);
        return resolve();
      }
    );
  });
});
