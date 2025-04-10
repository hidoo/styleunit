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
  @include mixin.text-apply-line-truncate(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin text-apply-line-truncate($line)', () => {
  it('should throw error if argument "$line" is not valid.', async () => {
    const cases = [
      { params: [['$line: null']] },
      { params: [['$line: false']] },
      { params: [['$line: #000']] },
      { params: [['$line: "3"']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$line must be number/));
      return resolve();
    });
  });

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [],
        expected: `.selector {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
        params: [['$line: 3']],
        expected: `.selector {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`
      },
      {
        params: [['$line: 5']],
        expected: `.selector {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
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
