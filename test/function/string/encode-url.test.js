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
@use "src/lib/function";

.selector {
  content: function.string-encode-url(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function string-encode-url($string)', () => {
  it('should throw error if argument "$string" is not valid.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$string: null']] },
      { params: [['$string: false']] },
      { params: [['$string: 0']] },
      { params: [['$string: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out encoded string.', async () => {
    const cases = [
      {
        params: [['$string: "%buzz"']],
        expected: `.selector{content:"${encodeURIComponent('%buzz')}"}`
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
