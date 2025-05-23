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
  @include mixin.by-breakpoints(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin by-breakpoints(...)', () => {
  it('should out rules inside @media rule with specified queries.', async () => {
    const cases = [
      {
        params: [
          [''],
          [
            '$breakpoints: ("sm": "(640 <= width)", "md": "(768px <= width)", "_private": "screen", "_not_string": 100px)'
          ]
        ],
        expected:
          '.selector{font-size:16px}@media(640 <= width){.sm\\:selector{font-size:16px}}@media(768px <= width){.md\\:selector{font-size:16px}}'
      },
      {
        params: [
          [
            '$breakpoints: ("sm": "(640 <= width)", "md": "(768px <= width)", "_private": "screen", "_not_string": 100px)'
          ]
        ],
        expected:
          '.selector{font-size:16px}@media(640 <= width){.sm\\:selector{font-size:16px}}@media(768px <= width){.md\\:selector{font-size:16px}}'
      },
      {
        params: [
          [
            '$breakpoints: ("sm": "(640 <= width)", "md": "(768px <= width)", "_private": "screen", "_not_string": 100px)',
            '$ignores: ("md")'
          ]
        ],
        expected:
          '.selector{font-size:16px}@media(640 <= width){.sm\\:selector{font-size:16px}}'
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
