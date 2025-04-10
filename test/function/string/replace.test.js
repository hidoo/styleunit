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
  content: function.string-replace(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@function string-replace($string, $search, $replace, $options)', () => {
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

  it('should throw error if argument "$search" is not valid.', async () => {
    const cases = [
      { params: [[]] },
      { params: [['$string: "buzz", $search: null']] },
      { params: [['$string: "buzz", $search: false']] },
      { params: [['$string: "buzz", $search: 0']] },
      { params: [['$string: "buzz", $search: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out replaced string.', async () => {
    const cases = [
      {
        params: [['$string: "buzz"', '$search: "z"']],
        expected: '.selector{content:"bu"}'
      },
      {
        params: [['$string: "buzz"', '$search: "z"', '$replace: "a"']],
        expected: '.selector{content:"buaa"}'
      },
      {
        params: [['$string: "buzz"', '$search: "z"', '$replace: 0']],
        expected: '.selector{content:"bu00"}'
      },
      // with $options.all
      {
        params: [
          [
            '$string: "buzz"',
            '$search: "z"',
            '$replace: "a"',
            '$options: ("all": false)'
          ]
        ],
        expected: '.selector{content:"buaz"}'
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
