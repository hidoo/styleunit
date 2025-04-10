/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../../util/index.js';

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
  @include mixin.box-apply-clearfix(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin box-apply-clearfix(...)', () => {
  it('should out clearfix settings.', async () => {
    const cases = [
      {
        params: [[]],
        expected: `.selector::before, .selector::after {
  content: "";
  display: table;
}
.selector::after {
  clear: both;
}`
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
      },
      { style: 'expanded' }
    );
  });
});
