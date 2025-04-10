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
  @include mixin.font-initialize(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin font-initialize(...)', () => {
  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected: `.selector {
  font-style: normal;
  font-weight: normal;
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
      { outputStyle: 'expanded' }
    );
  });

  it('should out properties with specified value if arguments is set.', async () => {
    const cases = [
      {
        params: [['$style: italic', '$weight: 600']],
        expected: `.selector {
  font-style: italic;
  font-weight: 600;
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
      { outputStyle: 'expanded' }
    );
  });
});
