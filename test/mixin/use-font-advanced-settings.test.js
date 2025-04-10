/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../util/index.js';

/**
 * wrapper
 *
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (settings = []) => `
${useSettingsWith(settings)}
@use "sass:meta";
@use "src/lib/mixin";

.selector {
  content: meta.mixin-exists("use-font-advanced-settings", "mixin");
}
`;

describe('[DEPRECATED] @mixin use-font-advanced-settings(...)', () => {
  it('should exists.', async () => {
    const cases = [
      {
        params: [[]],
        expected: '.selector{content:true}'
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
