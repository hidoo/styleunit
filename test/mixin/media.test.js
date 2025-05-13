import assert from 'node:assert';
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
  @include mixin.media(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin media(...)', () => {
  it('should out rules inside @media rule with specified queries.', async () => {
    const cases = [
      {
        params: [['$query: "(max-width: 667px)"']],
        expected: '@media(max-width: 667px){.selector{font-size:16px}}'
      },
      {
        params: [['$query: "print"']],
        expected: '@media print{.selector{font-size:16px}}'
      },
      {
        params: [
          ['$query: "(width < $mobile)"'],
          ['$breakpoints: ("mobile": 667px)']
        ],
        expected: '@media(width < 667px){.selector{font-size:16px}}'
      },
      {
        params: [['$query: "sm"'], ['$breakpoints: ("sm": "(width < 667px)")']],
        expected: '@media(width < 667px){.selector{font-size:16px}}'
      },
      {
        params: [
          ['$query: "sm"'],
          ['$breakpoints: ("mobile": 667px, "sm": "(width < $mobile)")']
        ],
        expected: '@media(width < 667px){.selector{font-size:16px}}'
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
